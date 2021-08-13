import React, { useState } from 'react'
import {toast} from 'react-toastify'
import {Buton} from 'antd'
import { auth } from '../../firebase'
function Register() {
const [email, setEmail]= useState('')

const handleSubmit =async(e)=>{
e.preventDefault()
const config ={
    url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
    handleCodeInApp:true
}
//send to email for authentication
await auth.sendSignInLinkToEmail(email, config)
toast.success(`Email sent to ${email}. Click link to complete your registration`)
// save user in local storage
window.localStorage.setItem('emailForRegistration',email)
setEmail('')
}


    const registerForm = ()=>{
return <form  onSubmit={handleSubmit}>
<input type="email" className="form-control mb-3" value ={email} onChange={(e)=>setEmail(e.target.value) } autoFocus placeholder="Your email" />
<button type="submit" className="btn btn-raised">Register</button>
</form>
    }
    return (
        <div className="container p-5 ">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h4>Register</h4>
                 
                 {registerForm()}
              </div>
              </div> 
        </div>
    )
}

export default Register
