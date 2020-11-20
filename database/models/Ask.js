const sequelize = require("sequelize")
const Database = require("./../Database")

/** Criando uma tabela no banco **/
const Ask = Database.define(
    "asks",
    {
        /** column **/
        subject: {
            type: sequelize.STRING,
            allowNull: false
        },

        /** column **/
        description: {
            type: sequelize.TEXT,
            allowNull: false
        }
    }
)

/** se a tabela não existir, vai ser criada. Mas caso ela exista, não é pra forçar a criação (re-criar) **/
Ask.sync( { force: false } ).then(() => console.log("DatabaseSync: asks"))
