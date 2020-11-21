const sequelize = require("sequelize")
const Database = require("../Database")

const Answer = Database.define(
    "answers",
    {
        /** relacionamento "cru" */
        ask_id: {
            type: sequelize.INTEGER,
            allowNull: false
        },

        body: {
            type: sequelize.TEXT,
            allowNull: false
        }
    }
)

/**
 * Caso a tabela não exista, ela vai ser criada.
 * Mas caso exista, o {force: false} vai fazer com que ela não seja re-criada
 * */
Answer.sync( { force: false } ).
then(() => console.log("DatabaseSync: answers"))
.catch((error) => console.log("DatabaseSyncError (answers): " + error))

module.exports = Answer