import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {Button} from 'antd'
import { auth ,gogleAuthProvider} from '../../firebase'
import {MailOutlined,GoogleOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from '../../functions/auth'




function Login({history}) {
const [email, setEmail]= useState('')
const [password, setPassword]= useState('')
const [loading, setLoading]= useState(false)
const dispatch = useDispatch()
const {user }= useSelector((state)=>({...state}))
useEffect(()=>{
    const intended = history.location.state
    if(intended){
        return
    }
else{
if(user && user.token){
    return history.push('/')
}
}
    

},[user,history])
const redirectUserByRole = (res)=>{
    //check if intended
const intended = history.location.state
if(intended){history.push(intended.from)
}else{
     if(res.data.role === "admin"){
        history.push('/admin/dashboard')
    }else{
        history.push('/user/history')
    }
}
}
   
const handleSubmit =async(e)=>{
e.preventDefault()
setLoading(true)
try {
    const result = await auth.signInWithEmailAndPassword(email, password)
   const {user }= result
   const idTokenResult = await user.getIdTokenResult()
   createOrUpdateUser(idTokenResult.token)
.then((res)=> {dispatch({type:"LOGGED_IN_USER", payload:{
    name:res.data.name,
       email:res.data.email,
       token:idTokenResult.token,
       _id:res.data._id,
       role:res.data.role

   }
})
redirectUserByRole(res)
})
.catch((error)=>{
    console.log(error);
})
   
   setLoading(false)
  // history.push('/')
} catch (error) {
    console.log(error);
    toast.error(error.message)
    setLoading(false)
}

}

const googleLogin=async(e)=>{
e.preventDefault()
auth.signInWithPopup(gogleAuthProvider)
.then(async(result)=>{
const {user}= result
const idTokenResult = await user.getIdTokenResult()

createOrUpdateUser(idTokenResult.token)
.then((res)=> {dispatch({type:"LOGGED_IN_USER", payload:{
    name:res.data.name,
       email:res.data.email,
       token:idTokenResult.token,
       _id:res.data._id,
       role:res.data.role

   }
})
redirectUserByRole(res)
})
.catch((error)=>{
    console.log(error);
})
 
//history.push('/') 
})
.catch((error)=>{
    console.log(error);
    toast.error(error.message)
})
}
    const loginForm = ()=>{
return <form  onSubmit={handleSubmit}>
<input type="email" className="form-control mb-3" value ={email} onChange={(e)=>setEmail(e.target.value) } autoFocus placeholder="Your email" />
<input type="password" className="form-control mb-3" value ={password} onChange={(e)=>setPassword(e.target.value) } placeholder="Your password" />
<Button onClick = {handleSubmit}
className="mb-3"
type="primary"
shape="round"
block
icon={<MailOutlined/>}
size ="large"
disabled={!email || password.length < 6}
>Login with Email/password</Button>

</form>
    }
    return (
        <div className="container p-5 ">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                {loading ? <h4 className="text-danger">Loading...</h4> :<h4>Login</h4> }  
                 
                 {loginForm()}
                 <Button onClick = {googleLogin}

type="danger"
shape="round"
block
icon={<GoogleOutlined/>}
size ="large"


>Login with Google</Button>
<Link to='/forgot/password' className="float-right text-danger">Forgot password</Link>
              </div>
              </div> 
        </div>
    )
}

export default Login