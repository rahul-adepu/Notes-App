const express = require('express');
const connectDB = require("./db");
const userRouter = require('./routes/user.route');
const notesRoute = require('./routes/notes.route')
const cors = require('cors');
const dotenv = require('dotenv')


const app = express();

dotenv.config()

app.use(cors())
app.use(express.json())
app.use("/user", userRouter);
app.use("/notes", notesRoute)


app.get('/', (req, res) => {
    res.send("Home page")
})

app.listen(process.env.PORT, async () => {
    await connectDB;
    console.log("Connected to DB")
    console.log("Server is Running")
})