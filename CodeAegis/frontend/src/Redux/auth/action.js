import * as types from "./actionTypes"

export const loginSuccess=(payload)=>{
 
    return {
        type:types.LOGIN_SUCCESS,
        payload
    }
}