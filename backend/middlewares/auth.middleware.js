const jwt = require('jsonwebtoken')
const NotesModel = require('../models/notes.model')
require("dotenv").config();

const auth = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.send("Please Login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        if (decoded) {
            req.body.userID = decoded.userID;
            req.body.name = decoded.name;
            next();
        }
    } catch (error) {
        res.send({ err: error.message })
    }
}


const checkWhetherUserIsCorrect = async (req, res, next) => {
    const { id } = req.params
    const noteFromDB = await NotesModel.findOne({ _id: id })
    console.log(noteFromDB)
    console.log(req.body.user)
    const checkUser = req.body.userID === noteFromDB.userID
    if (checkUser) {
        next();
    } else {
        res.send("You don't have access to this role")
    }
}

module.exports = { auth, checkWhetherUserIsCorrect };