import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" }); // Validation state
    const navigate = useNavigate();

    const userLogin = async () => {
        setError({ email: "", password: "" });

        if (!email || !password) {
            setError({
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : "",
            });
            return;
        }

        try {
            const isUserLoggedIn = await axios.post("http://localhost:8000/user/login", { email, password });

            if (isUserLoggedIn.data.token) {
                localStorage.setItem("token", isUserLoggedIn.data.token);
                localStorage.setItem("name", isUserLoggedIn.data.user)
                navigate('/');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <Center minHeight="calc(100vh - 57px)" p={4}>
            <Box
                border="0.0px solid red"
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
                    <Heading mt={2} mb={6} color="black.100" textAlign="center">Login to your Account</Heading>

                    <FormControl isRequired display="flex" flexDirection="column" alignItems="center">
                        <Box w="80%">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {error.email && <Text color="red.500" fontSize="sm">{error.email}</Text>}
                        </Box>

                        <Box w="80%" mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {error.password && <Text color="red.500" fontSize="sm">{error.password}</Text>}
                        </Box>

                        <Button mt={6} colorScheme="gray" w="20%" onClick={userLogin}>
                            Login
                        </Button>
                    </FormControl>

                    <Text mt="auto" textAlign="center">
                        Don't have an Account?{' '}
                        <Link as={RouterLink} to='/register' color="blue.500" fontWeight="bold">
                            Register here
                        </Link>
                    </Text>
                </Box>
            </Box>
        </Center>
    );
}

export default Login;
