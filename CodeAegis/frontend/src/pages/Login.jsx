 
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { save } from '../utils/sessionStorage';
import { loginSuccess } from '../Redux/auth/action';

export const Login=()=> {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const toast = useToast()
 
  const valdateForm=()=>{
      let status=true
     
       if(!data.email){
          status= false
          toast({
           
            description: "Please enter email",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:'top'
          })
      }else if(!data.password){
          status= false
          toast({
            description: "Please enter password",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:'top'
          })
      }
      return status
  }
  const [data,setData]= useState({
    email:"",
    password:""
  })
  const handleChange=(name)=>(e)=>{
      setData({...data,[name]:e.target.value})
  }
  
const handleLogin=()=>{
 if(!valdateForm()){
  return
 }else{
    axios.post("http://localhost:4000/login",data).then((res)=>{
      save(res.data.user,"user")
      save(res.data.token,"token")
      toast({
        description: res.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position:'top'
      })
      dispatch(loginSuccess(res.data.token))
      navigate("/")
    }).catch((err)=>{
      console.log(err)
      toast({
        description: err.response.data|| "Login failed",
        status: 'error',
        duration: 4000,
        isClosable: true,
        position:'top'
      })
    })
 }
}

  
  return (
    // <Box bgImage="https://images.unsplash.com/photo-1580679568899-be51739ba2df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVuenxlbnwwfDF8MHx8&w=1000&q=80" h="100vh" bgRepeat="no-repeat" w="100%" backgroundPosition="center" >
    <Flex 
    
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleChange("email")} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={handleChange("password")} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button 
              onClick={handleLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Button onClick={()=>{
                navigate("/register")
              }} bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>Register </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    // </Box>
  );
}