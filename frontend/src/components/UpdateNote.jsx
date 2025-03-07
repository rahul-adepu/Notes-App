import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormLabel,
    Input,
    FormControl,
    Textarea,
} from '@chakra-ui/react'
import getAllNotes from '../store/NotesStore';
import axios from 'axios';

function UpdateNote() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedNote, updateNote, fetchAllNotes } = getAllNotes();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleTitle = (e) => {
        updateNote("title", e.target.value);
    };

    const handleTextarea = (e) => {
        updateNote("body", e.target.value);
    };

    const handleSave = async () => {
        if (!selectedNote || !selectedNote._id) {
            console.error("Error: selectedNote or _id is missing");
            return;
        }

        const payload = {
            body: selectedNote.body,
            category: selectedNote.category,
            title: selectedNote.title
        };

        try {
            await axios.patch(`http://localhost:8000/notes/update/${selectedNote._id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            fetchAllNotes()
            onClose(); 
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };


    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">Edit</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Your Note..</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input ref={initialRef} value={selectedNote?.title} onChange={(e) => handleTitle(e)} placeholder='Title of note' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={selectedNote?.body}
                                onChange={(e) => handleTextarea(e)}
                                placeholder="Here is a sample placeholder"
                                size="sm"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateNote;