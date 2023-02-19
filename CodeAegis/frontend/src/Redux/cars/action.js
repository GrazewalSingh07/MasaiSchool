import axios from 'axios'
import * as types from './actionTypes'

const dataRequest=()=>{
    return {
        type:types.GET_CARS_REQUEST
    }
}

const dataSuccess=(payload)=>{
    return {
        type:types.GET_CARS_SUCCESS,
      payload
       
    }
}
const dataFailure=(payload)=>{
    return {
        type:types.GET_CARS_FAILED,
        payload
    }
}
export const getData=(page=1)=>(dispatch,getState)=>{
    
        dispatch(dataRequest())
        let token=getState().AuthReducer.token
        
        axios.get(`http://localhost:4000/car?page${page}&limit=10`,{ headers: { Authorization: `Bearer ${token}` } } ).then((res)=>{
            dispatch(dataSuccess({data:res.data.allCars, paginate:res.data.pagination}))
        }).catch((err)=>{
            dispatch(dataFailure(err.message))
        })
   
}
export const postCar=(data)=>(dispatch,getState)=>{
    
    let token=getState().AuthReducer.token
    
  return  axios.post("http://localhost:4000/car", {
        model: data.model,
       color: data.color,
       file: data.image
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,body:data 
        }
         
      }) 
}
export const updateCar=(data)=>(dispatch,getState)=>{
    
    let token=getState().AuthReducer.token
    
  return  axios.patch(`http://localhost:4000/car/${data._id}`, {
        model: data.model,
       color: data.color,
       file: data.image
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,body:data 
        }
         
      }) 
}
