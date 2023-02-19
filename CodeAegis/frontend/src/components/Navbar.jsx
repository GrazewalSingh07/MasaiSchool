import { Button, Container, HStack } from '@chakra-ui/react'
import React from 'react'
import {Link} from "react-router-dom"

export const Navbar = () => {

    const routes=[
        {label:"Home",value:"/"},
        {label:"Sign up",value:"/register"},
        {label:"Log in", value:"/login"},
        {label:"My Cars",value:"/my_cars"},

    ]
  return (
    <Container   boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" maxWidth="container.2xl" p="1rem">
       <HStack justifyContent="space-evenly" spacing={12}>
        {routes?.map((el)=>{

                return <Link key={el.label}  to={el.value} >{el.label}</Link>
            })}
            <Button>Log out</Button>
       </HStack>
    </Container>
  )
}
