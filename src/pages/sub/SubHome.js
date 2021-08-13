import React,{useState,useEffect} from 'react'
import {getSubCategory} from '../../functions/subcategory'

import ProductCard from '../../components/cards/ProductCard'
function SubHome({match}) {
const[sub,setSub]= useState({})
const[products,setProducts]= useState([])
const [loading,setLoading]= useState(false)
const{slug} = match.params
useEffect(()=>{
    setLoading(true)
getSubCategory(slug)
.then((c)=>{
    console.log(JSON.stringify(c.data,null,4));
    setSub(c.data.sub)
    setProducts(c.data.products)
    setLoading(false)

})
.catch(err=>console.log("GET CATEGORY HOME",err))
},[])
    return (
        <div className="container-fluid">
         <div className="row">
             <div className="col">
                 {loading ? (<h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4 ">Loading...</h4>):(<h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4 ">{products.length} products in "{sub.name}" subcategory</h4>)}
             </div>
         </div>
         <div className="row">
             {products.map((pro)=>{
                 return <div className="col-md-4" key={pro._id}>
                     <ProductCard product={pro}/>
                 </div>
             })}
         </div>
        </div>
    )
}

export default SubHome
