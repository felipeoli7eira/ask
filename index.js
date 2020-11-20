const express = require("express")
const Database = require("./database/Database")
const Ask = require("./database/models/Ask")

const app = express()

Database.authenticate()
.then(() => {
    console.log("Connected")
})
.catch((error) => {
    console.log("DBConnectionError: " + error)
})

/********* configs *********/

/** definindo o ejs como view engine do app (o renderizador de html) */
app.set("view engine", "ejs")

/** Definindo o local onde estão os arquivos estáticos (css, imagens e etc...) */
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/********* rotas *********/


/** raiz */
app.get("/", (req, res) => {

    /** SELECT * FROM asks */
    /**
     * por padrão, o sequelize trás junto com os dados, outras configurações.
     * com o parâmetro { raw: true } ele trás os dados e nada mais
    */
    Ask.findAll({ raw: true, order: [ ["id", "DESC"] ] }).then((results) => {

        res.render("view", { vname: "home", data: results })
    })
})

/** perguntar */
app.get("/perguntar", (req, res) => {

    res.render("view", { vname: "ask", data: {} })
})

app.post("/perguntar", (req, res) => {

    const { subject, description } = req.body

    /** INSERT INTO asks */
    Ask.create(
        {
            subject,
            description
        }
    )
    .then(() => {
        res.redirect("/")
    })
    .catch((error) => {
        console.log("DBCreateError: " + error)
    })
})

/********* server *********/
app.listen(8080, (error) => {
    console.log("App running")
})