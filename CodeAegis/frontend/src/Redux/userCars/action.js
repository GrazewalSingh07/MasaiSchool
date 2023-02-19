import axios from 'axios'
import * as types from './actionTypes'

const dataRequest=()=>{
    return {
        type:types.GET_USER_CARS_PENDING
    }
}

const dataSuccess=(payload)=>{
    return {
        type:types.GET_USER_CARS_SUCCESS,
        payload
    }
}
const dataFailure=(payload)=>{
    return {
        type:types.GET_USER_CARS_FAILED,
        payload
    }
}
export const getData=(page=1)=>(dispatch,getState)=>{
    
        dispatch(dataRequest())
        let token=getState().AuthReducer.token
        
        axios.get(`http://localhost:4000/user-car?page=${page}&limit=10`,{ headers: { Authorization: `Bearer ${token}` } } ).then((res)=>{
            dispatch(dataSuccess(res.data.user_cars))
        }).catch((err)=>{
            dispatch(dataFailure(err.message))
        })
   
}
export const addData=(data)=>(dispatch,getState)=>{
    
    dispatch(dataRequest())
    let token=getState().AuthReducer.token
    
   return axios.post("http://localhost:4000/user-car",{
       car_id:data
      },{ headers: { Authorization: `Bearer ${token}` } } ) 

}