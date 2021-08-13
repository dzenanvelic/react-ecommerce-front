import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { createProduct, createproduct} from '../../../functions/product'
import{EditOutlined, DeleteOutlined} from '@ant-design/icons'
import SearchForm from '../../../components/forms/SearchForm'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories,getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import{LoadingOutlined} from '@ant-design/icons'
function ProductCreate({history}) {
    const {user}= useSelector((state)=>({...state}))
   const[subOptions,setSubOptions]= useState([])
   const [showSub, setShowSub]= useState(false)
   const [loading,setLoading]=useState(false)
    const [values,setValues] = useState({
        title:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        subs:[],
        shipping:'',
        quantity:'',
        images:[],
        colors:["Black",'Silver','White','Blue','Red','Brown','Pink','Many'],
        brands:["HP",'Lenovo','ASSUS','Acer','Microsoft','Toshiba','ALIEN','Samsung','Apple'],
        color:'',
        brand:'',
        ratings:[],


    })
    const{title,description,price,category,subs,shipping,quantity,images,colors,color,brands,brand,ratings,categories}= values

    const handleSubmit=(e)=>{
        e.preventDefault()
        createProduct(values,user.token)
        .then(res=>{
           // toast.success(`New product ${res.data.title} is  created`)
           window.alert(`New product ${res.data.title} is created`)
           window.location.reload()
console.log("CREATE PRODUCT RESPONSE",res);
//history.push('/admin/products')
        })
        .catch(err=>{
            console.log(err);
            //if(err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.err)
        })
    }

    const handleChange=(e)=>{
setValues({...values,[e.target.name]:e.target.value})
    }
    const handleCategoryChange=(e)=>{
        e.preventDefault()
        //console.log("CLICKED CATEGORY",e.target.value);
        setValues({...values,subs:[],category:e.target.value})
        getCategorySubs(e.target.value)
        .then(res=>{
          //  console.log("SUB CATEGORY OPTIONS",res.data);
setSubOptions(res.data)
setShowSub(true)

        }
        
        )
        .catch(err=>{
            console.log(err);
        })
    }
useEffect(()=>{
loadCategories()
},[])
const loadCategories
=()=>{
    getCategories()
    .then(res=>{
setValues({...values,categories:res.data})
    })
    .catch(err=>{
        console.log(err)})
}    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col-md-10">
               {loading? <LoadingOutlined className="text-danger h1" />:  <h4>Product create</h4>}    
                   
        <hr />
        <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
        </div>
        <ProductCreateForm handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        values={values}
         handleCategoryChange={handleCategoryChange} 
         setSubOptions={setSubOptions}
         subOptions={subOptions}
          showSub={showSub} setValues={setValues}/></div>
            </div>
         
        </div>
    )
}

export default ProductCreate
