const express = require("express");
const { auth, checkWhetherUserIsCorrect } = require("../middlewares/auth.middleware")
const NotesModel = require("../models/notes.model")
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const notesRoute = express.Router();

notesRoute.use(auth);

notesRoute.post("/create", async (req, res) => {
    const note = req.body;
    try {
        const CreateANote = new NotesModel(note);
        await CreateANote.save();
        res.send("Creates Note Successfully")
    } catch (error) {
        res.send(error.message)
    }
})


notesRoute.get("/", async (req, res) => {

    try {
        const notes = await NotesModel.find({ userID: req.body.userID });
        res.send(notes)
    } catch (error) {
        res.send(error.message)
    }
})

notesRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await NotesModel.findById({ _id: id })
        res.send(note)
    } catch (error) {
        res.send(error.message)
    }
})


notesRoute.patch("/update/:id", checkWhetherUserIsCorrect, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note ID format" });
    }

    try {
        const noteFromDB = await NotesModel.findById(id);

        if (!noteFromDB) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (req.body.userID !== noteFromDB.userID.toString()) {
            return res.status(403).json({ error: "You don't have access to update this note" });
        }

        await NotesModel.updateOne({ _id: id }, req.body);
        res.status(200).json({ message: "Note updated successfully" });

    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


notesRoute.delete('/delete/:id', checkWhetherUserIsCorrect, async (req, res) => {
    const { id } = req.params
    const noteFromDB = await NotesModel.findOne({ _id: id })
    const checkUser = req.body.userID === noteFromDB.userID
    if (checkUser) {
        // console.log("Fine go through it")
        await NotesModel.deleteOne({ _id: id });
        res.send("Note Deleted Successfully")
    }
    else {
        // console.log("You don't have access")
        res.send("You don't have access to delete this note")
    }
})

module.exports = notesRoute;