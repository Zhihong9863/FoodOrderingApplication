import React, {useState} from "react";
import { Box, Text, Flex, VStack, InputGroup, Input, InputRightElement, FormControl, FormLabel, FormErrorMessage, useToast} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/dataProvider"


/* Register page - use React hook Forms for collecting input and validating. Once validated and submitted, send request to Firebase and:
*   - if account exists with provided email, route to Login page
*   - if no account exists with provided email, create account and store user info in DB. Upon return, route back to Home page
*/
export const Register = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { registerNewAccount } = useDataProvider();
    const { register, handleSubmit, formState, watch } = useForm();

    const [emailErrorMsg, setEmailErrorMsg]= useState("Required");
    const [passwordErrorMsg, setPasswordErrorMsg]= useState("Required");
    const [emailsMatch, setEmailsMatch] = useState(true);
    const [passwordsMatch, setPasswordsMatch]= useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleShowPassword= () => setShowPassword(!showPassword)
    const handleShowConfirmPassword= () => setShowConfirmPassword(!showConfirmPassword)

    const handleRegister = async (data) => {
        //emails and passwords match
        if (data.email === data.confirmEmail && data.password === data.confirmPassword) {
            /**
             * When registerNewAccount is called and succeeds, Firebase Authentication SDK will automatically 
             * manage the user's session and JWT token. So in most cases we don't need to manually handle JWT tokens on the front end 
             * unless we need to send them to our own server for validation or other processing.
             */
            const result = await registerNewAccount(data); 
            
            //if result is not blank, means new account created
            if (result.success) {
                toast ({    
                    addRole: true,
                    title: "Your account was successfully created.",
                    position: 'top', 
                    status: 'success',
                    isClosable: true,
                });
            }
            //else, existing account
            else {
                toast ({    
                    addRole: true,
                    title: "The email provided is associated with an existing account.",
                    position: 'top', 
                    status: 'info',
                    isClosable: true,
                });
            }
             navigate("/login");
        }        
    }

    return (
        <><form className='Register' onSubmit={handleSubmit(handleRegister)}> 
            <Flex alignContent='center' justifyContent='center'>
                <Box title='register-form-box' id='register-form-box' bg='#000000' color='#fff' w='35rem' height='100%' m='2rem' p='1.5rem'> 
                    <VStack>
                        <Text fontSize='30px' fontWeight='bold' mb='1rem'> Register for an Account </Text>
                        <FormControl id='fnameField' isInvalid={!!formState?.errors?.firstName?.type}>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                id='firstName'
                                {...register("firstName", { required: true})}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='lnameField' isInvalid={!!formState?.errors?.lastName?.type}>
                            <FormLabel>Last Name</FormLabel>
                            <Input 
                                id='lastName'
                                {...register("lastName", { required: true })}
                            />
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl id='emailField' isInvalid={!!formState?.errors?.email?.type || !emailsMatch}>
                            <FormLabel >Email Address</FormLabel>
                            <Input 
                                id='email'
                                type='email'
                                {...register("email", { 
                                    required: true,
                                    validate: (val) => {
                                        if (watch("confirmEmail") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                            setEmailsMatch(false);
                                        } 
                                        else {
                                            setEmailErrorMsg("Required");
                                            setEmailsMatch(true);
                                        }
                                    }
                                })}
                            />
                            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='confirmEmailField' isInvalid={!!formState?.errors?.confirmEmail?.type || !emailsMatch}>
                        <FormLabel>Confirm Email Address</FormLabel>
                            <Input 
                                id='confirmEmail'
                                type='confirmEmail'
                                {...register("confirmEmail", { 
                                    required: true,
                                    validate: (val) => {
                                        if (watch("email") != val) {
                                            setEmailErrorMsg("Email addresses do not match.");
                                            setEmailsMatch(false);
                                            
                                        } 
                                        else {
                                            setEmailErrorMsg("Required");
                                            setEmailsMatch(true);
                                        }
                                    }
                                })}
                            />
                            <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
                        </FormControl>
                        <FormControl id='phoneField'>
                            <FormLabel>Phone Number (optional)</FormLabel>
                            <Input 
                                type='tel'
                                {...register("phone")}
                            />
                        </FormControl>
                        
                        <FormControl id='passwordField' isInvalid={!!formState?.errors?.password?.type || !passwordsMatch}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password", { 
                                        required: true,
                                        validate: (val) => {
                                            if (watch("confirmPassword") != val) {
                                                setPasswordErrorMsg("Passwords do not match.");
                                                setPasswordsMatch(false);
                                            } 
                                            else {
                                                setPasswordErrorMsg("Required");
                                                setPasswordsMatch(true);
                                            }
                                        } 
                                    })}
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box  
                                        bg='#A4A1A2' 
                                        w='3.5rem' 
                                        h='2rem' 
                                        borderRadius='md' 
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowPassword} 
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <FormControl id='confirmPasswordField' isInvalid={!!formState?.errors?.confirmPassword?.type || !passwordsMatch}>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register("confirmPassword", { 
                                        required: true,
                                        validate: (val) => {
                                            if (watch("password") != val) {
                                                setPasswordErrorMsg("Passwords do not match.");
                                                setPasswordsMatch(false);
                                            } 
                                            else {
                                                setPasswordErrorMsg("Required");
                                                setPasswordsMatch(true);
                                            }
                                        }
                                    })}
                                />
                                <InputRightElement width='4.5rem' h='48px'>
                                    <Box 
                                        bg='#A4A1A2' 
                                        w='3.5rem' 
                                        h='2rem' 
                                        borderRadius='md' 
                                        align='center'
                                        pt='0.25rem' 
                                        onClick={handleShowConfirmPassword} 
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
                        </FormControl>

                        <Text fontStyle="italic"> 
                            {"Passwords must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number."} 
                        </Text>
                        <Box 
                            align='center'
                            as='button' 
                            pt='0.25rem' 
                            mt='0.5rem'
                            bg='#fff' 
                            color='#000000'
                            h='40px'
                            w='250px'
                            fontWeight='bold'
                            fontSize='20px'
                            borderRadius='md'
                            > 
                            Register
                        </Box>
                    </VStack>
                </Box>
            </Flex>
        </form></>
    );
};