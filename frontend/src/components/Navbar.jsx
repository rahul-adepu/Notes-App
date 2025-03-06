import { Box, Button, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login')
    }
    return (
        <Box style={{ border: "1px solid red", display: "flex", justifyContent: "space-between", alignItems: "center" }} w="100vw">
            <Heading ml={5}>Notes</Heading>
            <Box style={{ border: "1px solid red", display: "flex", justifyContent: "space-between" }}>
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
