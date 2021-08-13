import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'


import { getProductsByCount, removeProduct } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
function AllProducts() {
   
     const {user}= useSelector((state)=>({...state}))
    const [products,setProducts]= useState([])
const [loading,setLoading]= useState(false)
    useEffect(()=>{
loadProductsByCount()

    },[])
    const handleRemove=(slug)=>{
        const answer = window.confirm('Do you want delete this item?')
        if(answer){
            console.log("Send Delete Request",slug)
            removeProduct(slug,user.token)
            .then(res=>{
                loadProductsByCount()
               toast.error(`${res.data.title} is deleted`)
            })
            .catch(err=>{
                console.log(err);
            })
        }
      
    }
    const loadProductsByCount =()=>{
        setLoading(true)
        getProductsByCount(15)
        .then((res)=>{
            setLoading(false)
          //  console.log("RESPONSE PRODUCTS",res.data);
            setProducts(res.data)
        })
        .catch(err=>{
            setLoading(false)
            console.log(err);
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col ">
                    {loading ? (<h4 className='text-danger text-center'>Loading...</h4>): (<h4 className="text-center mt-3 mb-5">All Products</h4>)}
                    
                    <div className="col">
                        <div className="row">
                             {products.map((product)=>{
                            return <div key={product._id} className="col-md-4 pb-3"><AdminProductCard product={product} handleRemove={handleRemove} />
                                </div>
                         })}
                        </div>
                        
                             
                       
                  
                    </div>
                   </div>
            </div>
        </div>
    )
}

export default AllProducts
