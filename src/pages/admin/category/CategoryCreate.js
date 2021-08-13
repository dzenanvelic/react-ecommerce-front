import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import{EditOutlined, DeleteOutlined} from '@ant-design/icons'
import SearchForm from '../../../components/forms/SearchForm'
function CategoryCreate() {
    const {user}= useSelector((state)=>({...state}))
    const [name,setName] = useState('')   
    const [categories,setCategories]= useState([])
    const[keyword,setKeyword]= useState('')
 const [loading, setLoading]=useState(false)
 const handleSubmit=(e)=>{
e.preventDefault()
setLoading(true)
setName('')
createCategory({name}, user.token)
.then(res=>{
    setLoading(false)
toast.success(`${res.data.name} category is successfuly created`)
loadCategories()

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
 useEffect(()=>{
loadCategories()
 },[])
 const handleDelete =async(slug)=>{
    
     if(window.confirm('Delete?')){
          setLoading(true)
         removeCategory(slug,user.token)
         .then(res=> {
             setLoading(false)
             toast.error(`${res.data.name} deleted`)
              loadCategories()
            }
                        
             )

         .catch(err=> {
            setLoading(false) 
            console.log("DELETE CATEGORY ERROR",err)})
     }

 }
 
 const searched =(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)
    return (
       <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col ">
                   {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create category</h4> } 
                    <form className='form-group' onSubmit={handleSubmit}>
                    <input type="text" className="form-control"
                    autoFocus
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    required />
                   <br />
<button className="btn btn-outline-primary">Create</button>
<br />
<SearchForm keyword={keyword} setKeyword={setKeyword}/>
                    </form>
                  
                    {categories.filter(searched(keyword)).map((c)=>{
                       return <div className="alert alert-secondary" key={c._id}>{c.name} <span className="btn btn-sm float-right"><Link to={`/admin/category/${c.slug}`}><EditOutlined clasName="text-warning "/></Link></span ><span  onClick={()=>handleDelete(c.slug)}  className="btn btn-sm float-right"><DeleteOutlined clasName="text-danger "/></span></div>
                   })}
                    </div>
                   
            </div>
        </div>
    )
}

export default CategoryCreate
