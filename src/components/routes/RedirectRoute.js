import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

function RedirectRoute() {
    const history = useHistory()
    const [count,setCount]= useState(5)
    useEffect(()=>{
       const interval =  setInterval(()=>{
setCount((currentCount)=> --currentCount)

         } ,1000 )
         //redirect
         count === 0 && history.push('/')
return ()=> clearInterval(interval)
    },[count])
    return (
        <div>
            <h1>Redirecting in {count} seconds</h1>
        </div>
    )
}

export default RedirectRoute
