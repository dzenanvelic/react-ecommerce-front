import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { Link, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {  getCategories } from '../../../functions/category'
import { updateSubCategory, getSubCategory,  } from '../../../functions/subcategory'

import SearchForm from '../../../components/forms/SearchForm'
function SubUpdate({history}) {
    const{slug}= useParams()
    const {user}= useSelector((state)=>({...state}))
    const [name,setName] = useState('')   
    const [categories,setCategories]= useState([])
    
    const [parent, setParent]= useState('')
   
 const [loading, setLoading]=useState(false)
 const handleSubmit=(e)=>{
e.preventDefault()
setLoading(true)
setName('')
updateSubCategory(slug,{name,parent}, user.token)
.then(res=>{
    setLoading(false)
toast.success(`${res.data.name} sub category is successfuly updated`)
 history.push('/admin/sub')

})
.catch(err=>{
    setLoading(false)
    console.log("CATEGORY CREATE ERROR",err)
toast.error(err.message)
})
 }
 const loadCategories=()=>{
     getCategories()
     .then(res=>setCategories(res.data))
     .catch(err=>console.log('GETTING CATEGORIES ERROR',err))
    
 }
 const loadSubCategory=()=>{
     getSubCategory(slug)
     .then(res=>{
         setName(res.data.name)
        setParent(res.data.parent)
        }
         )
     .catch(err=>console.log('GETTING SUB CATEGORIES ERROR',err))
    
 }
 useEffect(()=>{
loadCategories()
loadSubCategory()
 },[])
 
 
 
    return (
       <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col ">
                   {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update sub category</h4> } 
                   <form className="form-group"
                   >
                     <label >Parent Category:</label>  
                     <select name="category" className="form-control pl-2" 
                     value={parent}
                    
                     onChange={(e)=>setParent(e.target.value)}>
                         <option  >select category</option>
                         {categories.length > 0 &&categories.map((c)=>{
                             return <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                         })}
                     </select>
                    
                   </form>

                  
                    <form className='form-group' onSubmit={handleSubmit}>
                    <input type="text" className="form-control"
                    autoFocus
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    required
                    placeholder="Sub category name" />
                   <br />
<button className="btn btn-outline-primary">Update</button>
<br />

                    </form>
                  
                    
                    </div>
                   
            </div>
        </div>
    )
}

export default SubUpdate