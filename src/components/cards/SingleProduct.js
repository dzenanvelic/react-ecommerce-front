import React,{useState} from 'react'
import {Card,Tabs,Tooltip} from 'antd'
import StarRating from 'react-star-ratings'
import _ from 'lodash'
import {useHistory} from 'react-router-dom'
import laptopImage from '../../images/lap1.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Link}from 'react-router-dom'
import{useSelector,useDispatch}from 'react-redux'
import{HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import ProductListItems from './ProductListItems';
import RatingModal from './modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { addToWishlist } from '../../functions/user'
import { toast } from 'react-toastify'
const { TabPane } = Tabs;
const {Meta}=Card
//this is children component of SingleProsuct page
function SingleProductCard({product,onStarClick,star}) {
const{title,images,description,_id}= product
const[tooltip, setTooltip]= useState("Click to add")
 const dispatch=useDispatch()
 const history = useHistory()
 const {user}= useSelector((state)=>({...state}))
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
    const handleAddToWhishlist=(e)=>{
e.preventDefault()
addToWishlist(product._id,user.token)
.then(res=>{
    //console.log("ADdED TO WHISLIST",res.data)
    toast.success("Added to whishlist")
    history.push('/user/whishlist')
})
    }
    return (<>
    
        <div className="col-md-7">
            {images && images.length ? (<Carousel autoPlay showArrows={true} infiniteLoop>
    {images && images.map((image)=>{
        return <img src={image.url} key={image.public_id}/>
    })}
</Carousel>):( <Card cover={<img className='mb-3 card-image' src={laptopImage}/>}/>)}
<Tabs type='card'>

<TabPane tab="Description" key="1">
    {description && description}
</TabPane>
<TabPane tab="More" key="2">
    Call us on 8000-5000-usersupport about this product
</TabPane>
</Tabs>
        </div>
        <div className="col-md-5">
           <h1 className="bg-info p-3">{title}</h1>
{product && product.ratings && product.ratings.length > 0 ?  showAverage(product) :<h5 className="text-center"> No ratings yet</h5>}
<Card  actions={[<>
            <Tooltip title={tooltip}>
      <a onClick={handleAddToCart}><ShoppingCartOutlined  className="text-danger"/> <br />Add to Cart
   </a>
 </Tooltip>
            </>,
       
            <a onClick={handleAddToWhishlist}>
            <HeartOutlined className="text-info"/> <br />
Add to WhishList
</a>
       ,
        <RatingModal>

<StarRating
name={_id}
numberOfStars={5}
rating={star}
changeRating={onStarClick}
isSelectable={true}
starRatedColor="gold"
/>
        </RatingModal>
        ]}>
    
  
   {/* <p>price/category/subs/shipping/color/brand//quantity,available,sold</p> */}
   <ProductListItems product={product}/>
</Card>
        </div>
            
       
     </>)
}

export default SingleProductCard
