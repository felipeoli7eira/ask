const express = require("express")
const Database = require("./database/Database")
const AskModel = require("./database/models/Ask")

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

    res.render("view", { vname: "home" })
})

/** perguntar */
app.get("/perguntar", (req, res) => {

    res.render("view", { vname: "ask" })
})

app.post("/perguntar", (req, res) => {

    const { subject, desc } = req.body

    res.json(req.body)
})

/********* server *********/
app.listen(8080, (error) => {
    console.log("App running")
})