import React, {useState} from 'react'
import{Card, Tooltip}from 'antd'
import laptopDefaultImage from '../../images/lap1.jpg'
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import {Link}from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import _ from 'lodash'
import{useSelector,useDispatch}from 'react-redux'
const{Meta} = Card
function ProductCard({product,}) {
    const dispatch=useDispatch()
    const{user,cart}= useSelector((state)=>({...state}))
    const{title,description,images,slug,price}= product
    const[tooltip, setTooltip]= useState("Click to add")
    const handleAddToCart=()=>{
        
        //create cart array
        let cart = []
        if(typeof window !== 'undefined'){
            //if cart is in local storage GET it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
                //push new product to cart
               cart.push({
                   ...product,
                   count:1,
               }) 
               //save to local storage and remove duplicates
let unique = _.uniqWith(cart, _.isEqual)
//console.log("UNIQUE",unique);
               localStorage.setItem('cart',JSON.stringify(unique))
            //show toltip 
        setTooltip('Added')
        //add to redux state
        dispatch({type:'ADD_TO_CART',payload:unique})
        //show cart items in side drawer
        dispatch({
type:"SET_VISIBLE", payload:true
        })
        }
    }
    return (<>
        {product && product.ratings && product.ratings.length > 0 ?  showAverage(product) :<h5 className="text-center"> No ratings yet</h5>}
        <Card cover={<img style={{ height: 150 ,objectFit:"cover"}} className='p-2' src={images && images.length ? images[0].url : laptopDefaultImage}/>}
        actions={[
   <Link to={`/product/${slug}`}><EyeOutlined /><br />View Product</Link> ,
 <Tooltip title={tooltip}>
      <a onClick={handleAddToCart}disabled={product.quantity < 1}><ShoppingCartOutlined  className="text-danger" /> <br />{product.quantity < 1 ? "Out of Stock ": "Add to Cart"}
   </a>
 </Tooltip> 
]}
>

         <Meta title={`${title} - $${price}`} description={`${description && description.substring(0,40)}...`}/>
        </Card>
   </> )
}

export default ProductCard
