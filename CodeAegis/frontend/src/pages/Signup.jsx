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

export const Signup=()=> {
  const navigate= useNavigate()
  
  const toast = useToast()
 
  const valdateForm=()=>{
      let status=true
     
       if(!data.email){
          status= false
          toast({
            title:"Email",
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
  
const handleRegister=()=>{
 if(!valdateForm()){
  return
 }else{
    axios.post("http://localhost:4000/register",data).then((res)=>{
      toast({
        description: res.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position:'top'
      })
    }).catch((err)=>{
      toast({
        description:"Register failed",
        status: 'error',
        duration: 4000,
        isClosable: true,
        position:'top'
      })
    })
 }
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
         <Stack align={'center'}>
           <Heading fontSize={'4xl'}>New user? Register Now</Heading>
         </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleChange("email")}  type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={handleChange("password")}  type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
              onClick={handleRegister}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
               Register
              </Button>
              <Button onClick={()=>{
                navigate("/login")
              }} bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>Login </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}