 
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/sessionStorage';
import { useToast } from '@chakra-ui/react';

export const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const toast= useToast()
    const token=get("token")

    const checkUserToken = () => {
       
        if (!token || token === 'undefined') {
           
            toast({ 
                description: "Please Login first",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top'
              })
            return navigate('/login');
        }
    }
        
    useEffect(() => {
            checkUserToken();
        }, [token]);
    return (
        <React.Fragment>
            {
                token ? props.children : null
            }
        </React.Fragment>
    );
}
