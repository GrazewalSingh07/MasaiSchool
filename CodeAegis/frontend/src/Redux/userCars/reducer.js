
import * as types from "./actionTypes"
const initState={
    data:[]
    
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){ 
        case(types.GET_USER_CARS_SUCCESS):{
            return {
                ...state,
                data:payload
            }
        }
         default:{
            return state
         }
    }
}