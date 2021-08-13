import React,{useEffect, useState} from 'react'
import{
    CardElement,useStripe,useElements
} from '@stripe/react-stripe-js'
import {useSelector,useDispatch} from 'react-redux'
import{createpaymentIntent} from '../functions/stripe'
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import {CheckOutlined, DollarOutlined} from "@ant-design/icons"
import laptop from '../images/lap1.jpg'
import { createOrder, deleteUserCart } from '../functions/user'
function StripeCheckout({history}) {
    const dispatch=useDispatch()
    const {user,coupon} = useSelector((state)=>({...state}))
    const[succeeded,setSucceeded]= useState(false)
    const[error,setError]= useState(null)
    const[processing,setProcessing]= useState('')
    const[disabled,setDisabled]= useState(true)
    const[clientSecret,setClientSecret]= useState('')
const [cartTotal,setCartTotal]= useState(0)
const [totalAfterDiscount,setTotalAfterDiscount]= useState(0)
const[payable,setPayable]= useState(0)

    const stripe=useStripe()
    const elements = useElements()

    useEffect(()=>{
createpaymentIntent(coupon,user.token)
.then((res)=>{
    console.log('create payment intent',res.data)
    setClientSecret(res.data.clientSecret)
    //additional res on successful payment
    setCartTotal(res.data.cartTotal)
    setTotalAfterDiscount(res.data.totalAfterDiscount)
    setPayable(res.data.payable)
})
    },[])
    const handleSubmit=async(e)=>{
e.preventDefault()
setProcessing(true)
const payload = await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
            name:e.target.name.value,
        }
    }
})
if(payload.error){
    setError(`Payment failed ${payload.error.message}`)
    setProcessing(false)
}else{
//here you get result after successful payment

//create order and save in db for admin to process and empty user cart from redux and ls
createOrder(payload,user.token)
.then(res=>{
    if(res.data.ok){
        //empty cart from loc storage, redux, database
       if(typeof window !== "undefined"){
            localStorage.removeItem("cart")
        }
        dispatch({type:"ADD_TO_CART", payload:[]})
        //reset coupon to false
        dispatch({type:"COUPON_APPLIED", payload:false})
deleteUserCart(user.token)
    }
})
console.log(JSON.stringify(payload, null,4))
setError(null)
setProcessing(false)
setSucceeded(true)
}
    }
    const handleChange=async(e)=>{
        //listen for changes in card element and display any errors as customer types their card details
setDisabled(e.empty)
setError(e.error ? e.error.message : "")//show error msg
    }
        const cartStyle = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };
    return (<>
   {
       !succeeded && <div>
           {coupon && totalAfterDiscount !== undefined ?(<p className="alert alert-success ">{`Total after discount $${totalAfterDiscount}`}</p>):(<p className="alert alert-danger ">No coupon applied</p>)}
       </div>
   }
    <div className="text-center pb-5">
        <Card cover={<img src={laptop} style={{height:'200px',objectFit:"cover",marginBottom:"-50px"}}/>}actions={[
            <>
<DollarOutlined className="text-info"/><br/>Total: ${cartTotal}
            </>,
            <>
<CheckOutlined className="text-info"/><br/>Total payable: ${(payable/100).toFixed(2)}
            </>
        ]}/>

       
    </div>
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cartStyle} onChange={handleChange}/>
              <button className="stripe-button" disabled={processing || disabled || succeeded}><span id="button-text">{processing ? <div className="spinner" id="spinner"></div>: "Pay"}</span></button>
              <br />
                {error && <div className="card-error" role="alert">{error}</div>}
        </form>
<br />
 <p className={succeeded ? 'result-message' : "result-message hidden"}>Payment Successful.<Link to='/user/history'>See it in your purchase history</Link></p>
  </>  )
}

export default StripeCheckout
