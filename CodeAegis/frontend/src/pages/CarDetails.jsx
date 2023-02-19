import { Card, CardBody,CardFooter, Text, Heading,Stack, HStack,ButtonGroup, Divider, Button ,Image, useToast} from '@chakra-ui/react'
import moment from 'moment/moment'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addData } from '../Redux/userCars/action' 
import { useDispatch } from 'react-redux'
import { getData } from '../Redux/cars/action'
import { get } from '../utils/sessionStorage'

export const CarDetails = () => {
    const location= useLocation()
    let data=location.state
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const toast = useToast()
 

    const handleBuy=(id)=>{
        dispatch(addData(id)).then((res)=>{
          dispatch(getData())
             toast({
              description: res.data.message,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
            
         }).catch((err)=>{
             toast({
              description:"Buy car failed",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
         })
      }
  return (
    <Card m="auto" mt="10%" maxW='sm'>
    <CardBody>
      <Image
        src={data?.image}
        alt='Green double couch with wooden legs'
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{data?.model}</Heading>
        <Text>
         <b>Color </b>
          {data?.color}
        </Text>
        <Text>
        <b>Unique ID</b> {data?._id}
        </Text>
        <Text>
            <b>Manufacturing Date</b> {moment( data?.createdAt).format("DD-MM-YYYY")}
        </Text>
        <Text color='blue.600' fontSize='2xl'>
          $450
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button onClick={()=>{
            navigate(-1)
        }} variant='solid' colorScheme='blue'>
         Go back
        </Button>
        <Button onClick={()=>handleBuy(data._id)} ml="1rem"  variant='solid' colorScheme='blue'>
              Buy {data.model}
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  )
}
