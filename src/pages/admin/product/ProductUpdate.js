import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { Link, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {  getProduct, updateProduct} from '../../../functions/product'
import{EditOutlined, DeleteOutlined} from '@ant-design/icons'
import SearchForm from '../../../components/forms/SearchForm'

import { getCategories,getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import{LoadingOutlined} from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
function ProductUpdate({match,history}) {
    const {user}= useSelector((state)=>({...state}))
   const{slug}= match.params
    const[loading, setLoading]= useState(false)
    const[arrayOfSubIds,setArrayOfSubIds]=useState([])
    const[subOptions,setSubOptions]= useState([])
    const [showSub, setShowSub]= useState(false)
    const[categories,setCategories]= useState([])
    const[selectedCategory,setSelectedCategory]=useState('')
    const [values,setValues] = useState({
        title:'',
        description:'',
        price:'',
        
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

    useEffect(()=>{
        loadSingleProduct()
        loadCategories()
    },[])
    const loadSingleProduct=()=>{
getProduct(slug)
.then((res)=>{
setValues({...values,...res.data})


getCategorySubs(res.data.category._id)
.then(sub=>{
    setSubOptions(sub.data)
})
//prepare array of sub id-s
let array=[]
res.data.subs.map((s)=>{
  array.push(s._id)
})
console.log("ARRAY",array);
setArrayOfSubIds((prev)=>array)//this is needed for antd select to work
})
    }
    const loadCategories
=()=>{
    getCategories()
    .then(res=>{
setCategories(res.data)
    })
    .catch(err=>{
        console.log(err)})
} 
    const handleSubmit=(e)=>{
e.preventDefault()
setLoading(true)
values.subs=arrayOfSubIds
values.category=selectedCategory ? selectedCategory : values.category
updateProduct(slug,values,user.token)
.then(res=>{
setLoading(false)
toast.success(`${res.data.title} is updated`)
history.push('/admin/products')
})
.catch(err=>{
    setLoading(false)
    console.log("PRODUCT UPDATE ERROR",err);
    toast.error(err.response.data.err)
})
    }
    const handleChange=(e)=>{
        
setValues({...values,[e.target.name]:e.target.value})
//load single product category subs

    }
     const handleCategoryChange=(e)=>{
        e.preventDefault()
        //console.log("CLICKED CATEGORY",e.target.value);
        setValues({...values,subs:[]})
        setSelectedCategory(e.target.value)
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
        //if user returns back to original category value
        if(values.category._id === e.target.value){loadSingleProduct()}
        //clear all subs
        setArrayOfSubIds([])
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col-md-10">
              {loading? <LoadingOutlined className="text-danger h1" />:  <h4>Product update</h4>}    
               {/* {JSON.stringify(values)}   */}
                 <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
        </div>
                <ProductUpdateForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} setValues={setValues}
                 handleCategoryChange={handleCategoryChange} 
         setSubOptions={setSubOptions}
         subOptions={subOptions}
          showSub={showSub} 
          categories={categories}
          arrayOfSubIds={arrayOfSubIds}
          setArrayOfSubIds={setArrayOfSubIds}
          selectedCategory={selectedCategory}
                />
        <hr />
       
        </div>
            </div>
         
        </div>
    )
}

export default ProductUpdate
