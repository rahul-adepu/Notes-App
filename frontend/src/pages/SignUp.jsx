import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    const userRegister = async () => {
        if (password !== confirmPassword) {
            return;
        }
        setError({ name: "", email: "", password: "", confirmPassword: "" });

        if (!name || !email || !password || !confirmPassword) {
            setError({
                name: !name ? "Name is required" : "",
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : "",
                confirmPassword: !confirmPassword ? "Confirm Password is required" : "",
            });
            return;
        }

        try {
            console.log(name, email, password)
            const isUserLoggedIn = await axios.post("http://localhost:8000/user/register", { name, email, password });
            console.log(isUserLoggedIn);
            navigate('/login');
            console.log("Register")
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <Center h="calc(100vh - 50px)" p={4}>
            <Box
                // border="0.0px solid red"
                w={{ base: "90vw", md: "50vw" }} 
                h={{ base: "auto", md: 500 }} 
                boxShadow="md"
                borderRadius="lg"
                display="flex"
                flexDirection={{ base: "column", md: "row" }} 
                justifyContent="space-between"
                alignItems="center"
                p={4}
            >
                {/* Image Section */}
                <Box w="80%" textAlign="center" mb={{ base: 4, md: 0 }} display={{ base: "none", md: "block" }}>
                    <Image
                        src="https://www.notud.com/hs-fs/hubfs/Home%20page%20Notud-1.png?width=363&height=400&name=Home%20page%20Notud-1.png"
                        alt="First Note image"
                        maxW={{ base: "100%", md: "100%" }}
                    />
                </Box>

                {/* Login Form Section */}
                <Box
                    // border="1px solid blue"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    width={{ base: "100%", md: "100%" }}
                    height="86%"
                >
                    <Heading mt={2} mb={6} color="black.100" textAlign="center">Register your details</Heading>

                    <FormControl isRequired display="flex" flexDirection="column" alignItems="center">
                        <Box sx={{ display: "flex" }}>
                            <Box>
                                <Box w="95%" mt={4}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    {error.name && <Text color="red.500" fontSize="sm">{error.name}</Text>}
                                </Box>
                                <Box w="95%" mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {error.password && <Text color="red.500" fontSize="sm">{error.password}</Text>}
                                </Box>
                            </Box>
                            <Box>
                                <Box w="100%" mt={4}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {error.email && <Text color="red.500" fontSize="sm">{error.email}</Text>}
                                </Box>

                                <Box w="100%" mt={4}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {error.confirmPassword && <Text color="red.500" fontSize="sm">{error.confirmPassword}</Text>}
                                </Box>
                            </Box>
                        </Box>



                        <Button mt={6} colorScheme="gray" w="20%" onClick={userRegister}>
                            Register
                        </Button>
                    </FormControl>

                    <Text mt="auto" textAlign="center">
                        Already Registered?{' '}
                        <Link as={RouterLink} to='/login' color="blue.500" fontWeight="bold">
                            Login here
                        </Link>
                    </Text>
                </Box>
            </Box>
        </Center>
    );
}

export default SignUp;
