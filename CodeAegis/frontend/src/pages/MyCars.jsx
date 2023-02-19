import { Container,Image,Card,Stack,CardBody,Heading,Text,CardFooter,Button, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import{ useDispatch, useSelector} from "react-redux"
import { getData } from '../Redux/userCars/action'
import { useNavigate } from 'react-router-dom'
import { get } from '../utils/sessionStorage'

export const MyCars = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const data= useSelector((state)=>state.MycarReducer.data)
    useEffect(()=>{
        dispatch(getData())
    },[])
    const paginate= useSelector((state)=>state.carReducer.paginate)
  
  
 
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
  return (
    <Container maxWidth="container.xl" p="2rem">
      {data?.length==0? 
      <Text >You have no cars</Text>
      : data?.map((el)=>{
        return <Card key={el._id}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={el.car_id.image}
          alt={el.model}
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{el.car_id.model}</Heading>
      
            <Text py='2'>
             {el.color}
            </Text>
          </CardBody>
       
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
  )
}
