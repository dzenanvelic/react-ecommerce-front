import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router'
import RedirectRoute from './RedirectRoute'

function UserRoute({children,...rest}) {
    const {user}= useSelector((state)=>({...state}))
    return user && user.token ? (
        <Route {...rest} render={()=>children} />
    ): (<RedirectRoute/>)
        
    
}

export default UserRoute
