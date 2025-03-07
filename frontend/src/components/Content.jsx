import React, { useEffect } from 'react'
import getAllNotes from '../store/NotesStore'

function Content() {

    const { notes, fetchAllNotes } = getAllNotes();
    console.log(notes)

    useEffect(() => {
        fetchAllNotes()
    }, [])
    return (
        <div>
            {
                notes.map((note) => (
                    <div>
                        <h1>{note.title}</h1>
                        <h6>{note.body}</h6>
                    </div>
                ))
            }
        </div>
    )
}

export default Content
