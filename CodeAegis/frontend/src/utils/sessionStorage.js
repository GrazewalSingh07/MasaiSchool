export const save=(data,name)=>{
    sessionStorage.setItem(name,JSON.stringify(data))
    console.log("hi")
    return
}
export const get=(name)=>{
    let data= JSON.parse(sessionStorage.getItem(name))
    return data
}