import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import React from "react"
import getAllNotes from "../store/NotesStore"

function DeleteNote() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const { selectedNote, setSelectedNote, fetchAllNotes } = getAllNotes();

    const handleDelete = async () => {
        const deleteNote = await axios.delete(`http://localhost:8000/notes/delete/${selectedNote._id}`, {
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        fetchAllNotes();
        setSelectedNote(null);
        onClose()
        console.log(deleteNote)
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="red">Delete</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete your note? You can't restore your note. It will be deleted permanently..
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={handleDelete}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteNote;