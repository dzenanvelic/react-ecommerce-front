import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
function PasswordChange() {
      const [password, setPassword]= useState('')
      const[loading, setLoading ]= useState(false)
const handleSubmit=async(e)=>{
  e.preventDefault()
    setLoading(true)
    setPassword('')
 await auth.currentUser.updatePassword(password)
 .then(()=>{
   setLoading(false)
   toast.success("Password successfuly updated")})
 .catch((error)=> {
  setLoading(false) 
  toast.error(error.message)})
  
}
    const passwordChangeForm=()=>{
      
      return  <form className="form-group" onSubmit={handleSubmit}>
        <h4>Password Update</h4>
            <label>Change password</label>
            <input type="password" className="form-control" placeholder="Enter new password here" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading}/>
            <button className="btn btn-primary"disabled={loading || password.length < 6 || !password}>
              Submit
            </button>

        </form>
    }
        return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><UserNav/></div>
                <div className="col ">{passwordChangeForm()}</div>
            </div>
            </div>
    )
}

export default PasswordChange
