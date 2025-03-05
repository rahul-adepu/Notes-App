const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    name: String,
    userID: String
})

const NotesModel = mongoose.model('notes', noteSchema);

module.exports = NotesModel;