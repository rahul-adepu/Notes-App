import React, { useState } from 'react';
import { Textarea } from '@chakra-ui/react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';

function CreateNote() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [textarea, setTextarea] = useState('');
    const [title, setTitle] = useState('');

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    let handleTitle = (e) => {
        setTitle(e.target.value)
    }

    let handleTextarea = (e) => {
        setTextarea(e.target.value)
    }


    const create = async () => {
        await axios.post("http://localhost:8000/notes/create", { title, body: textarea }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        onClose()
        setTitle("");
        setTextarea("");
    }



    const token = localStorage.getItem('token')


    return (
        <>
            <Button onClick={() => token ? onOpen() : alert("Please login to create a new note")}>
                New Note
            </Button>
            {/* <Button ml={4} ref={finalRef}>
                I'll receive focus on close
            </Button> */}

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new note..</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input ref={initialRef} value={title} onChange={handleTitle} placeholder='Title of note' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                value={textarea}
                                onChange={handleTextarea}
                                placeholder="Here is a sample placeholder"
                                size="sm"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={create}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateNote;