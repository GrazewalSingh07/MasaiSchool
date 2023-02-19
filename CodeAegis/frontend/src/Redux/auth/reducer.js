
import { get } from "../../utils/sessionStorage"
import * as types from "./actionTypes"

const initState={
    token:get("token")||""
}

export const reducer=(state= initState,{type,payload})=>{
 
    switch(type){
        case(types.LOGIN_SUCCESS):{
            return {
                ...state,
                token: payload
            }
        }
        default:{
            return state
        }
    }
    
}