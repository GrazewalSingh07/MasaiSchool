import { Container,Image,Card,Stack,CardBody,Heading,Input,Text,CardFooter,Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { getData, postCar, updateCar } from '../Redux/cars/action'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { addData } from '../Redux/userCars/action' 
import { Navigate, useNavigate } from 'react-router-dom'
import { get } from '../utils/sessionStorage'

export const Cars = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const toast = useToast()
    const data= useSelector((state)=>state.carReducer.data)
    const paginate= useSelector((state)=>state.carReducer.paginate)
  
    const [value,setValue]= useState({
      model:"",
      color:"",
      image:"",

    })

 
    const [isPage,setIsPage]= useState(1)
    useEffect(()=>{
       dispatch(getData(isPage))
  },[isPage])
  const handleChangePage=(page)=>{
      if(page==1){
          if(isPage==paginate.totalPage){
              return
          }
          setIsPage(isPage+1)
      }else{
          if(isPage==1){
              return
          }
          setIsPage(isPage-1)
      }
     
  }
    const handleCloseModal=()=>{
      setValue({ model:"",
      color:"",
      image:"",})
      onClose()
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(()=>{
        dispatch(getData())
    },[])
    const handleChangeValue=(name)=>(event)=>{
      if(name=="image"){
        setValue({...value,image:event.target.files[0]})

      }else{
        setValue({...value,[name]:event.target.value})
      }
    }
     
  const valdateForm=()=>{
    let status=true
   
     if(!value.model){
        status= false
        toast({
          
          description: "Please enter model",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position:'top'
        })
    }else if(!value.color){
        status= false
        toast({
          description: "Please enter color",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position:'top'
        })
    }else if(!value.image){
      status= false
      toast({
        description: "Please choose an image",
        status: 'error',
        duration: 4000,
        isClosable: true,
        position:'top'
      })
  }
    return status
}
    const handlePostCar=()=>{
      if(!valdateForm()){
        return
       }else{ 
         dispatch(postCar(value)).then((res)=>{
          dispatch(getData())
             toast({
              description: res.data.message,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
            onClose()
         }).catch((err)=>{
             toast({
              description:"Adding car failed",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
         })
        
        }
    }

    const  handleUpdateCar=()=>{
      if(!valdateForm()){
        return
       }else{ 
         dispatch(updateCar(value)).then((res)=>{
          dispatch(getData())
             toast({
              description: res.data.message,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
            onClose()
         }).catch((err)=>{
             toast({
              description:"Updating car failed",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position:'top'
            })
         })
        
        }
    }

   
    const editCar=(row)=>{
      setValue({...row})
      onOpen()
    }
  
  return (
    <>
    <Button onClick={onOpen} m="2rem" variant='solid' colorScheme='red'>Add new Car</Button>
    <Container maxWidth="container.xl" p="1rem">
      {data?.map((el)=>{
        return <Card
        cursor='pointer'
        onClick={()=>{
          navigate(`/cars/${el._id}`,{state:el})
        }}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={el.image}
          alt={el.model}
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{el.model}</Heading>
      
            <Text py='2'>
             {el.color}
            </Text>
           
          </CardBody>
      
          <CardFooter >
           
            <Button ml="1rem" variant='solid' onClick={(e)=>{
              e.stopPropagation()
              editCar(el) }} colorScheme='red'>Edit</Button>
          </CardFooter>
        </Stack>
      </Card>
      })}
      <Container bottom="1" position="absolute" right={0} alignItems="left">
        <HStack p="1rem">
            <Button disabled={isPage==1?false:true}  onClick={()=>{
                handleChangePage(-1)
            }}  variant="unstyled" >{`<`}</Button>
             
              < Text>curr {isPage}</Text>

              
            <Button color={isPage==paginate?.pages?"grey":"black"}disabled={isPage==paginate?.pages?false:true}  onClick={()=>{
                handleChangePage(1)
            }}variant="unstyled"  >{`>`}</Button>
             <Text fontSize="12px"> total : {paginate?.total} page :  {paginate?.totalPage}  limit {paginate?.limit}   </Text>
        </HStack>
      
     </Container>
    </Container>
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{value._id?"Update Car":"Add new car"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <HStack spacing={6}>
           <Input value={value?.model} onChange={handleChangeValue('model')} placeholder="car model"/>
            <Input value={value?.color} onChange={handleChangeValue("color")}  placeholder= "Car Color"/>
          </HStack>
          <HStack pt="6" >
           <Input onChange={handleChangeValue("image")} type="file"/>
          {value._id && <img style={{width:"100px"}} src={value?.image} alt="image review" />}
          </HStack>
        
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button onClick={ value._id?handleUpdateCar :handlePostCar} variant='ghost'>{value._id?"Update":"Save"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
