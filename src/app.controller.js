import express from "express"
import userController from "./Modules/User/user.controller.js"
import dbConnection from "./DB/connection.js"
import noteController from "./Modules/Note/Note.controller.js"
import { port } from "./config/config.services.js"
import cors from "cors"

export default () => {

    const app = express()

    app.use(express.json())

    app.use(cors())

    dbConnection()

    app.use("/users", userController)
    app.use("/notes", noteController)

    app.use((err, req, res, next) => {
        res.status(err.cause || 500).json({
            message: err.message,
            stack: err.stack
        })
    })

    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    })
}