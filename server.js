import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import "dotenv/config"
const app = express()
app.use(express.json())

app.use("/api/users", userRoute)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    console.log("mongoDb connected Successfully")
})
.catch((error) => {
    console.log(error.message)
})


app.listen(process.env.PORT, () => {
    console.log(`this server nis running on port ${process.env.PORT}`)
})