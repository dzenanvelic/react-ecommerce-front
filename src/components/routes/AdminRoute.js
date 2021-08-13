import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'
import RedirectRoute from './RedirectRoute'
function AdminRoute({ children, ...rest}) {
   
    const {user}= useSelector((state)=>({...state}))
     const[ok, setOk]= useState(false)
 
    useEffect(()=>{
if(user && user.token){
    currentAdmin(user.token)
    .then((res)=>{
        console.log("CURRENT ADMIN RES", res);
        setOk(true)
    })
    .catch(error=> console.log('ADMIN ROUTE ERROR',error))
}
    },[user])

       return ok ? (
        <Route {...rest} render={()=>children} />
    ): (<RedirectRoute/>)
   
}

export default AdminRoute
