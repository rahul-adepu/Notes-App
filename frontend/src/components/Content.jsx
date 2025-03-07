import { Box, Card, CardBody, Container, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import getAllNotes from "../store/NotesStore";

function Content() {
    const { notes, selectedNote, setSelectedNote, fetchAllNotes } = getAllNotes();
    const user = localStorage.getItem("name");
    const navigate = useNavigate();

    
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        fetchAllNotes();
    }, []);

    if (notes.length === 0) {

        return (
            <Box height="calc(100vh - 50px)" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>Hi, {user}.. It Seems You are new here!!!</Heading>
                <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} mt={4} color="blue.500" textAlign="center">
                    By using this application you can create notes
                </Heading>
            </Box>
        );
    }

    return (
        <Box display="flex" height="calc(100vh - 50px)">
            <Container ml={0} border="1px solid red" width={{ base: "100%", md: "40%" }}>
                {notes.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() => (isMobile ? navigate(`/notes/${item._id}`) : setSelectedNote(item))}
                        gap={4}
                        border="1px solid blue"
                        margin={2}
                        cursor="pointer"
                    >
                        <CardBody>
                            <Text fontWeight="bold">{item.title}</Text>
                        </CardBody>
                    </Card>
                ))}
            </Container>

            {!isMobile && selectedNote && (
                <Container maxW="8xl" mr={0} bg="blue.100">
                    <Text fontSize="6xl" fontWeight="bold">{selectedNote.title}</Text>
                    <Text mt={2} fontSize="4xl">{selectedNote.body}</Text>
                </Container>
            )}
        </Box>
    );
}

export default Content;
