import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);


    console.log("id", id)
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function getIndividualNote() {
            await axios.get(`http://localhost:8000/notes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `
                }
            }).then((res) => setNote(res.data));

        }

        getIndividualNote();
    }, [])

    console.log(note)

    if (!note) {
        return <Heading textAlign="center">Note not found!</Heading>;
    }

    return (
        <Box p={6} height="calc(100vh - 50px)">
            <Button onClick={() => navigate(-1)} colorScheme="blue" mb={4}>← Back</Button>
            <Heading fontSize="3xl">{note.title}</Heading>
            <Text mt={4} fontSize="xl">{note.body}</Text>
        </Box>
    );
}

export default NoteDetail;
