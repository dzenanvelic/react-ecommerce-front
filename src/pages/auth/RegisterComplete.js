import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {toast} from 'react-toastify'
import {Buton} from 'antd'
import { auth } from '../../firebase'
import { createOrUpdateUser } from '../../functions/auth'
import { useDispatch } from 'react-redux'
function RegisterComplete() {
    const dispatch = useDispatch()
    const history = useHistory()
const [email, setEmail]= useState('')
const [password, setPassword] = useState('')
useState(()=>{
setEmail(window.localStorage.getItem('emailForRegistration'))
},[])
const handleSubmit =async(e)=>{
e.preventDefault()
//vlidation
if(!email || !password){
    toast.error("Email and password is required")
    return
}
if(password.length < 6){
    toast.error("Password must be at least 6 characters long")
    return
}
try {
  const result = await  auth.signInWithEmailLink(email,window.location.href)
  //console.log("RESULT----_>", result);
  if(result.user.emailVerified){
      //remove email from localstorage
window.localStorage.removeItem('emailForRegistration')
      //get user id token
let user = auth.currentUser
await user.updatePassword(password)
const idTokenResult = await user.getIdTokenResult()
      //populate user in redux

createOrUpdateUser(idTokenResult.token)
.then((res)=> dispatch({type:"LOGGED_IN_USER", payload:{
    name:res.data.name,
       email:res.data.email,
       token:idTokenResult.token,
       _id:res.data._id,
       role:res.data.role

   }
}))
.catch((error)=>{
    console.log(error);
})
      //redirect
      history.push('/')
  }
} catch (error) {
    console.log(error);
    toast.error(error.message)
}
}


    const completeRegisterForm = ()=>{
return <form  onSubmit={handleSubmit}>
<input type="email" className="form-control mb-3" value ={email}  disabled  />
<input type="password" className="form-control mb-3" value ={password} onChange={(e)=>setPassword(e.target.value) } autoFocus placeholder="enter your password" />
<button type="submit" className="btn btn-raised">Complete registration</button>
</form>
    }
    return (
        <div className="container p-5 ">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h4>Complete registration</h4>
                 
                 {completeRegisterForm()}
              </div>
              </div> 
        </div>
    )
}

export default RegisterComplete
