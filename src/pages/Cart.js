import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout.js'
import {Link, useHistory} from 'react-router-dom'
import { userCart } from '../functions/user.js'
function Cart() {
    const{user, cart}= useSelector((state)=>({...state}))
    const history = useHistory()
   // console.log("CART",cart,"USER",user);
    const dispatch=useDispatch()

    const getTotal=()=>{
        return cart.reduce((c,n)=>{
return c+ (n.count * n.price)
        },0)
    }
    const saveOrderToDb=()=>{
//console.log("cart",cart);
userCart(cart,user.token)
.then(res=> {
    //console.log("cart post res",res)
if(res.data.ok)history.push('/checkout')
})
.catch(err=>console.log("cart save err",err))

    }
    const showCartItems=()=>{
       return <table className="table table-bordered">
        <thead className="thead-light">
        <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Shipping</th>
            <th scope='col'>Remove</th>
        </tr>
        </thead>
        {cart.map((p)=>{
            return <ProductCardInCheckout key={p._id} p={p}/>
        })}
        </table>
    }
    const saveCashOrderToDb=()=>{
        dispatch({type:"COD",payload:true})
        //console.log("cart",cart);
userCart(cart,user.token)
.then(res=> {
    //console.log("cart post res",res)
if(res.data.ok)history.push('/checkout')
})
.catch(err=>console.log("cart save err",err))
    }
    return (
        <div className="container-fluid pt-2">
           
               
               <div className="row">
                   <div className="col-md-9">
                        <h4>Cart / {cart.length} Product</h4>
                       {cart.length<1 ? <p>No Products in Cart.  <Link to='/shop'>Continue Shopping</Link></p> : (showCartItems())}
                   </div>
                   <div className="col-md-3">
                       Order Summary
                       <hr />
                       <p>Products</p>
                       {cart.map((c,i)=>{
                           return <div key={i}>
                               <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                           </div>
                       })}
                       <hr />
                       Total: <b>${getTotal()}</b>
                       <hr />
                       {
                           user ? (<>
                               <button onClick={saveOrderToDb} disabled={!cart.length}className="btn btn-sm btn-primary mt-2">Proceed to checkout</button>
<br />
 <button onClick={saveCashOrderToDb} disabled={!cart.length}className="btn btn-sm btn-warning mt-2">Pay Cash on Delivery</button>
                               </>
                           ): (<button className="btn btn-sm btn-primary mt-2"><Link to={{
                               pathname:'/login',
                               state:{from:'cart'},

                           }}>Login to checkout</Link></button>)
                       }
                   </div>
               </div>
           
        </div>
    )
}

export default Cart
