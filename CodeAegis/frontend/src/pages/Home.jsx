import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export const Home = () => {
  return (
  <Box pt="10%"  alignItems="center" textAlign={"center"} bgImage="https://images.unsplash.com/photo-1580679568899-be51739ba2df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVuenxlbnwwfDF8MHx8&w=1000&q=80" h="100vh" bgRepeat="no-repeat" w="100%" backgroundPosition="center" >
    <Heading style={{fontSize:"8em" , fontWeight:"700" ,color:"white"}} >Car Inventory</Heading>
  </Box>
  )
}
