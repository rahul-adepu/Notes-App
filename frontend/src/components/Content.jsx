import { Box, Button, Card, CardBody, Center, CloseButton, Container, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import getAllNotes from '../store/NotesStore';

function Content() {
    const { notes, selectedNote, setSelectedNote, fetchAllNotes } = getAllNotes();

    const user = localStorage.getItem("name")
    useEffect(() => {
        fetchAllNotes();
    }, [])

    if (notes.length === 0) {
        return (
            <Box height="calc(100vh - 50px)">
                <center>
                    <Heading h='100px' mt="300px">Hi,{user}.. It Seems You are new here!!!</Heading>
                    <Heading>By using this application you can create notes</Heading>
                </center>
            </Box>
        )
    }
    return (
        <div>
            <Box style={{ display: "flex", height: "calc(100vh - 50px)" }}>
                <Container ml={0} border="1px solid red" width="40%">
                    {
                        notes.map((item) => (
                            <Card key={item.id} onClick={() => setSelectedNote(item)} gap={4} border="1px solid blue" margin={2} >
                                <CardBody>
                                    <Text fontWeight="bold">{item.title}</Text>
                                </CardBody>
                            </Card>
                        ))
                    }


                </Container>

                {
                    selectedNote ? (
                        <Container maxW='8xl' mr={0} bg='blue.100'>
                            <Box display="flex" justifyContent="flex-end" p={2} gap={4}>
                                <CloseButton size='lg' colorScheme="red" onClick={() => setSelectedNote(null)} />
                            </Box>
                            {/* <Card mt={4} p={4} bg="gray.100">
                                <CardBody> */}
                            <Text fontSize="6xl" fontWeight="bold">{selectedNote.title}</Text>
                            <Text mt={2} fontSize="4xl">{selectedNote.body}</Text>
                            {/* </CardBody>
                            </Card> */}
                        </Container>
                    ) : (<Heading margin="auto" border="1px solid red">Welcome Back! {user}</Heading>)
                }
            </Box>
        </div>
    )
}

export default Content