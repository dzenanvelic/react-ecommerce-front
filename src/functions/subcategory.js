import axios from 'axios'

export const getSubCategories = async()=>{
    return await axios.get('http://localhost:8000/api/subs')
}
export  const getSubCategory = async(slug)=>{
    return await axios.get(`http://localhost:8000/api/sub/${slug}`)
}
export  const removeSubCategory = async(slug,authtoken)=>{
    return await axios.delete(`http://localhost:8000/api/sub/${slug}`,{headers:{
        authtoken
    }
})
}
export  const updateSubCategory = async(slug,sub,authtoken)=>{
    return await axios.put(`http://localhost:8000/api/sub/${slug}`,sub,{headers:{
        authtoken
    }})
}
export  const createSubCategory = async(sub,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/sub`,sub,{headers:{
        authtoken
    }})
}