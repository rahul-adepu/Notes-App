import { Box, Card, CardBody, Container, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import getAllNotes from "../store/NotesStore";
import UpdateNote from "./UpdateNote";
import DeleteNote from "./DeleteNote";

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
            <Box minHeight="calc(100vh - 57px)" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} textAlign="center">Hi, {user}.. It Seems You are new here!!!</Heading>
                <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} mt={4} color="blue.500" textAlign="center">
                    By using this application you can create notes
                </Heading>
            </Box>
        );
    }

    return (
        <Box display="flex" minHeight="calc(100vh - 57px)" overflowY="auto">
            <Container
                ml={0}
                width={{ base: "100%", md: "40%" }}
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                p={4}
                borderRadius="lg"
                bg="white"
            >
                {notes.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() => (isMobile ? navigate(`/notes/${item._id}`) : setSelectedNote(item))}
                        gap={4}
                        margin={2}
                        cursor="pointer"
                        border={selectedNote?._id === item._id ? "2px solid black" : "1px solid blue"}
                        bg={selectedNote?._id === item._id ? "gray.200" : "white"}
                        _hover={{ bg: "blue.50" }}
                    >
                        <CardBody>
                            <Text fontWeight="bold">{item.title}</Text>
                        </CardBody>
                    </Card>
                ))}
            </Container>


            {!isMobile && selectedNote && (

                <Container maxW="8xl" mr={0} pt={6} bg="blue.100">
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "12%", marginTop: "12px" }}>
                        <UpdateNote />
                        <DeleteNote />
                    </Box>
                    <Text fontSize="6xl" fontWeight="bold">{selectedNote.title}</Text>
                    <Text mt={2} fontSize="4xl">{selectedNote.body}</Text>
                </Container>
            )}
        </Box>
    );
}

export default Content;
