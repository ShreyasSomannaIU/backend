//require("dotenv").config({path: "./public/temp/.env"})

const dotenv = require("dotenv")

const connectToDatabase = require("./db/db.js")

dotenv.config({
    path: "./public/temp/.env"
})                                                          // Load environment variables from .env file

connectToDatabase()














// const express = require("express")
// const app = express()

// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${require("./constants").DB_NAME}` )
//         app.on("error", (err) => {
//             console.error("Express app error:", err)
//             throw err
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server started on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error)
//         throw error
//     }
// })()