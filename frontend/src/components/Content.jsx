import React, { useEffect } from 'react'
import getAllNotes from '../store/NotesStore'
import { Box, Card, CardBody, Container, Text } from '@chakra-ui/react';

function Content() {

    const { notes, fetchAllNotes } = getAllNotes();
    console.log(notes)

    useEffect(() => {
        fetchAllNotes()
    }, [])
    return (
        <div>
            <Box style={{ display: "flex", height: "calc(100vh - 50px)" }}>
                <Container ml={0} border="1px solid red" width="40%">
                    {
                        notes.map((item) => (
                            <Card key={item._id} gap={4} border="1px solid blue" margin={2}>
                                <CardBody>
                                    <Text fontWeight="bold">{item.title}</Text>
                                </CardBody>
                            </Card>
                        ))
                    }


                </Container>
            </Box>
        </div>
    )
}

export default Content
