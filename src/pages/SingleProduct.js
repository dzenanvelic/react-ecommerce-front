import React, { useState,useEffect } from 'react'
import {getProduct,productStar} from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import SingleProductCard from '../components/cards/SingleProduct'
import {useSelector} from 'react-redux'
import {getRelated} from '../functions/product'

function SingleProduct({match}) {
    const{user}= useSelector((state)=>({...state}))
    const[product,setProduct]= useState({})
    const [related,setRelated]= useState([])
    const {slug}= match.params
const[star,setStar]= useState(0)
    useEffect(()=>{
loadProduct()
    },[slug])
    useEffect(() => {
       if(product.ratings && user){
let existingRatingObject = product.ratings.find((ele)=>(ele.postedBy.toString() === user._id.toString())

)
existingRatingObject && setStar(existingRatingObject.star)
       }
        
    }, [])
    const loadProduct=()=>{
        getProduct(slug)
        .then(res=>{
            setProduct(res.data)
        //load related
        getRelated(res.data._id)
        .then(res=>setRelated(res.data))
        })
        .catch(err=>console.log(err))
    }
    const onStarClick=(newRating,name)=>{
        console.log("NEW RATING STARS",newRating);
       setStar(newRating)
       productStar(name,newRating,user.token)
       .then((res)=>{
           console.log("RATING CLICKED",res.data);
           loadProduct() //if you want show updated product star rating at the moment
       })
       .catch(err=>console.log(err))
    }
    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProductCard product={product} onStarClick={onStarClick}star={star}/>
            </div>
           <div className="row ">
               <div className="col text-center pt-5 pb-5">
                   <hr />
                  <h4>Related-products</h4>
                  
                  {/*  */}
                   <hr />
                   {/* {JSON.stringify(related)} */}
               </div>
               
           </div>
           <div className="row pb-5">
                   {related.length ? related.map((rel)=>{
                     return  <div className="col-md-4" key={rel._id}><ProductCard product={rel}/></div>
                   }) : <div className=" col text-center">No Products find</div>}
               </div>

        </div>
    )
}

export default SingleProduct
