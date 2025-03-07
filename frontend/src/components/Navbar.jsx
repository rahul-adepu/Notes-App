import { Box, Button, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import CreateNote from './CreateNote';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login')
    }
    return (
        <Box style={{ border: "1px solid gray", height:"57px", display: "flex", justifyContent: "space-between", alignItems: "center" }} w="100vw">
            <Heading ml={6} fontFamily="'Poppins', sans-serif">Notes</Heading>
            <Box style={{ display: "flex", justifyContent: "space-between" }} width={{ base: "60vw", md: "12vw" }}>
                <CreateNote />
                {
                    token ?
                        <Button mr={5} onClick={logout}>Logout</Button> :
                        <Button mr={5} onClick={() => navigate('/login')}>Login</Button>
                }
            </Box>
        </Box>
    )
}

export default Navbar
