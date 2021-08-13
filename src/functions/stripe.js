import axios from 'axios'


export const createpaymentIntent=(coupon,authtoken)=>{
   return axios.post('http://localhost:8000/api/create-payment-intent',{couponApplied:coupon},{
        headers:{
            authtoken
        }
    })
}