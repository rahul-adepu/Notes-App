import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateNote from "../components/UpdateNote";
import getAllNotes from "../store/NotesStore";
import DeleteNote from "../components/DeleteNote";

function NoteDetail() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const { selectedNote, setSelectedNote } = getAllNotes();


    console.log("id", id)
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function getIndividualNote() {
            await axios.get(`http://localhost:8000/notes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `
                }
            }).then((res) => {
                setNote(res.data);
                setSelectedNote(res.data);
            })

        }
        getIndividualNote();
    }, [])

    console.log(note)
    console.log("SelectedNote", selectedNote)

    if (!note) {
        return <Heading textAlign="center">Note not found!</Heading>;
    }

    return (
        <Box p={6} minHeight="calc(100vh - 57px)">
            <Box display="flex" justifyContent="space-between">
                {/* <Button onClick={() => navigate(-1)} colorScheme="blue" mb={4}>← Back</Button> */}
                <UpdateNote />
                <DeleteNote />
            </Box>
            <Box mt={4}>
                <Heading fontSize="3xl">{note.title}</Heading>
                <Text mt={4} fontSize="xl">{note.body}</Text>
            </Box>
        </Box>
    );
}

export default NoteDetail;