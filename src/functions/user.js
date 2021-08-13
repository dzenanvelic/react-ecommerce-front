import axios from 'axios'

export const userCart=async(cart,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/cart',{cart},{
    headers:{
        authtoken,
    }
})
}
export const getUserCart=async(authtoken)=>{
return await axios.get('http://localhost:8000/api/user/cart',{
    headers:{
        authtoken,
    }
})
}
export const deleteUserCart=async(authtoken)=>{
return await axios.delete('http://localhost:8000/api/user/cart',{
    headers:{
        authtoken,
    }
})
}
export const saveUserAdress=async(adress,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/adress',{adress},{
    headers:{
        authtoken,
    }
})
}
export const applyCoupon=async(coupon,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/cart/coupon',{coupon},{
    headers:{
        authtoken,
    }
})
}
export const createOrder=async(stripeResponse,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/order',{stripeResponse},{
    headers:{
        authtoken,
    }
})
}
export const getUserOrders=async(authtoken)=>{
return await axios.get('http://localhost:8000/api/user/orders',{
    headers:{
        authtoken,
    }
})
}
//whishlist
export const getWishlist=async(authtoken)=>{
return await axios.get('http://localhost:8000/api/user/whishlist',{
    headers:{
        authtoken,
    }
})
}

export const removeWishlist=async(productId,authtoken)=>{
return await axios.put(`http://localhost:8000/api/user/whishlist/${productId}`,{},{
    headers:{
        authtoken,
    }
})
}
export const addToWishlist=async(productId,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/whishlist',{productId},{
    headers:{
        authtoken,
    }
})
}

//cash payment
export const createCashOrders=async(COD,coupon,authtoken)=>{
return await axios.post('http://localhost:8000/api/user/cash-order',{COD,couponApplied:coupon},{
    headers:{
        authtoken,
    }
})
}