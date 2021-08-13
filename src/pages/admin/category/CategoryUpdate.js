import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {  useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category'

function CategoryUpdate({history}) {
    const {user}= useSelector((state)=>({...state}))
    const [name,setName] = useState('')   
   const {slug}= useParams()
 const [loading, setLoading]=useState(false)
 const handleSubmit=(e)=>{
e.preventDefault()
setLoading(true)

updateCategory(slug,{name}, user.token)
.then(res=>{
    setLoading(false)
toast.success(`${res.data.name} category is successfuly updated`)
history.push('/admin/category')

})
.catch(err=>{
    setLoading(false)
    console.log("CATEGORY UPDATE ERROR",err)
toast.error(err.message)
})
 }
 const loadCategory=()=>{
     getCategory(slug)
     .then(res=>setName(res.data.name))
     .catch(err=>console.log('GETTING CATEGORIES ERROR',err))
    
 }
 useEffect(()=>{
loadCategory()
 },[])
 
    return (
       <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col ">
                   {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update category</h4> } 
                    <form className='form-group' onSubmit={handleSubmit}>
                    <input type="text" className="form-control"
                    autoFocus
                    value={name}
                    onChange={e=>setName(e.target.value)} />
                   <br />
<button className="btn btn-outline-primary">Update</button>
                    </form>
                    <hr />
                    
                    </div>
                   
            </div>
        </div>
    )
}

export default CategoryUpdate