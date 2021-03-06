import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import{getOrders,changeStatus} from '../../functions/admin'
import{useSelector,useDispatch} from "react-redux"
import {toast, totast} from 'react-toastify'
import Orders from '../../components/Orders'
function AdminDashboard() {
   const [orders,setOrders]=useState([])
const{user}= useSelector((state)=>({...state}))
   useEffect(()=>{
loadOrders()

   },[])
   const loadOrders=()=>{
getOrders(user.token)
.then(res=>{
//console.log("ORDER RES",res.data)
setOrders(res.data)
   })
   }
   const handleStatusChange=(orderId,orderStatus)=>{
changeStatus(orderId,orderStatus,user.token)
.then((res)=>{
toast.success("Order successfuly updated")
loadOrders()
})
   }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><AdminNav/></div>
                <div className="col ">
                    <h4> Admin dashboard</h4>
                  <Orders orders={orders} handleStatusChange={handleStatusChange}/>
                   </div>
            </div>
        </div>
    )
}

export default AdminDashboard
