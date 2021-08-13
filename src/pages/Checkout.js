import React, { useEffect, useState } from 'react'
import { applyCoupon, createCashOrders, deleteUserCart, getUserCart,saveUserAdress } from '../functions/user'
import {useHistory} from 'react-router-dom'
import{useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
function Checkout() {
    const[products,setProducts]= useState([])
    const[total,setTotal]= useState(0)
    const[adress,setAdress]=useState('')
    const[adressSaved,steAdressSaved]= useState(false)
    const[coupon,setCoupon]= useState('')
    //discount price
    const[totalAfterDiscount,setTotalAfterDiscount]= useState(0)
    const [discErr,setDiscErr]= useState('')

    const {user,COD,coupon:couponTrueOrFalse} = useSelector((state)=>({...state}))
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
getUserCart(user.token)
.then(res=>{
   // console.log("cart data",res.data)
    setProducts(res.data.products)
    setTotal(res.data.cartTotal)
})
.catch(err=>console.log('User cart getting error',err))
    },[])
    const saveAdressDB=()=>{
saveUserAdress(adress,user.token)
.then((res)=>{
if(res.data.ok){
    steAdressSaved(true)
}
})
    }
    const emptyHandleDelete=async()=>{
        if(typeof window !== 'undefined'){
            localStorage.removeItem("cart");
           toast.success("Adress Saved")
        }
       // remove from redux
dispatch({type:"ADD_TO_CART",payload:[]})
       // remove from backend
 await deleteUserCart(user.token)
 .then(res=>{
     setProducts([])
     setTotal(0)
     setTotalAfterDiscount(0)
     setCoupon('')
     //history.push('/')
     toast.success("Cart is empty. Continue shopping.")
 })
    }
    const applyDiscountCoupon=()=>{
      //  console.log("send coupon to backend",coupon)
      applyCoupon(coupon,user.token)
      .then(res=>{
          console.log("res on coupon apply",res.data)
          if(res.data){
              setTotalAfterDiscount(res.data)
              //push the total aft disc to redux
              dispatch({type:"COUPON_APPLIED",payload:true})
          }if(res.data.err){
setDiscErr(res.data.err)
dispatch({type:"COUPON_APPLIED",payload:false})
//update redux coupon applied
          }
      })
    }
    const showAdress=()=>{
 
 return<>
 <ReactQuill theme="snow" value={adress} onChange={setAdress}/>
                <button className="btn btn-primary mt-2" onClick={saveAdressDB}>Save</button>
                </>
    }
    const showProductsSummary=()=>{
  return<span>{products.map((p,i)=>{
                    return <div key={i}>
                        <p>{p.product.title} ({p.color}) x {p.count}={' '} {p.price * p.count} </p>
                    </div>
                })}</span>
    }
    const showApplyCoupon=()=>{
      return  <>
<input type="text"className="form-control"onChange={(e)=>{setCoupon(e.target.value)
setDiscErr('')
}}value={coupon} />
<button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>Apply</button>
        </>
    }
    const createCashOrder=()=>{
createCashOrders(COD,couponTrueOrFalse,user.token,)
.then((res)=>{
    console.log("USER CASH ORDER CREATED",res.data)
    //empty cart from redux,localStorage,resetCoupon, COD reset,redirect user
    if(res.data.ok){
        //empty localStorage
        if(typeof window !=="undefined"){
            localStorage.removeItem("cart")
        }
        
        //empty cart from redux
        dispatch({type:"ADD_TO_CART",payload:[]})
        //empty redux cupon
         dispatch({type:"COUPON_APPLIED",payload:false})
         //empty redux COD
          dispatch({type:"COD",payload:false})
          //empty cart from backend
          deleteUserCart(user.token)
          //redirect
          setTimeout(()=>{
history.push('/user/history')
          },1000)
    }
})
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery adress</h4>
                <br />
                <br />
               {showAdress()}
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                <br />
              {showApplyCoupon()}
              <br />
              {discErr && <p className="bg-danger p-2">{discErr}</p>}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                
                <hr />
                <p>Products {products.length}</p>
                <hr />
              {showProductsSummary()}
                <hr />
                <p>Cart total: ${total}</p>
                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2">Discount Aplied: Total Payable: {totalAfterDiscount}</p>
                )}

                <div className="row">
                    <div className="col-md-6">
                       {COD ? (
 <button className="btn btn-primary"disabled={!adressSaved || !products.length} onClick={createCashOrder}>Place Order</button>

                       ): ( <button className="btn btn-primary"disabled={!adressSaved || !products.length} onClick={()=>history.push('/payment')}>Place Order</button>)}
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary"onClick={emptyHandleDelete} disabled={!products.length}>Empty Cart</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Checkout
