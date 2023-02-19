import * as types from "./actionTypes"
const initState={
    data:[],
    paginate:{}
    
}

export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case(types.GET_CARS_SUCCESS):{
             
            return {
                ...state,
                data:payload.data,
                paginate:payload.paginate
            }
        }
        default:{
            return state
        }
    }
 
}