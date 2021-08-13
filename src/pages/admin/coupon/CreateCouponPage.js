import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from 'react-datepicker'
import {getCoupons,createCoupons,removeCoupon} from '../../../functions/coupon'
import AdminNav from '../../../components/nav/AdminNav'
import{DeleteOutlined}from '@ant-design/icons'
import "react-datepicker/dist/react-datepicker.css";
function CreateCouponPage() {
    
    const[name,setName]= useState('')
    const[expire,setExpire]= useState('')
    const[discount,setDiscount]= useState('')
    const[loading,setloading]= useState(false)
const [coupons, setCoupons]= useState([])
const {user}= useSelector((state)=>({...state}))

    const handleSubmit=(e)=>{
        e.preventDefault()
        setloading(true)
      // console.log(name,expire,discount)
      
      createCoupons({name,expire,discount},user.token)
      .then((res)=>{
         
          setloading(false)
 console.log("COUPON RES",res)
          setName('')
          setDiscount('')
          setExpire('')
           getCoupons(user.token)
        .then(res=>{
setCoupons(res.data)
        })
          toast.success(`${res.data.name} coupon created successfuly`)
      })
      .catch(err=>{
          setloading(false)
          console.log("ERROR CREATING COUPON", err)
      })
    }

    useEffect(()=>{
        getCoupons(user.token)
        .then(res=>{
setCoupons(res.data)
        })
    },[]) 
    const handleRemove=(id)=>{
if(window.confirm("Delete")){
    setloading(true)
    removeCoupon(id,user.token)
    .then((res)=>{
        
      toast.error(`Coupon "${res.data.name}" is deleted`)
          getCoupons(user.token)
        .then(res=>{
setCoupons(res.data)
setloading(false)
  
        }).catch(err=>console.log("DELETE COUPON ERROR",err))
    })
}
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    {loading ? ( <h4 className="text-danger">Loading...</h4>):(<h4>Coupon</h4>)}  
                      <form onSubmit={handleSubmit}>
                          <div className="form-group">
                              <label className="text-muted">Name</label>
                              <input type="text" className="form-control" 
                              value={name}onChange={(e)=>setName(e.target.value)} autoFocus required/>
                          </div>
                          <div className="form-group">
                              <label className="text-muted">Discount %</label>
                              <input type="text" className="form-control" onChange={(e)=>setDiscount(e.target.value)} 
                              value={discount}autoFocus required/>
                          </div>
                          <div className="form-group">
                              <label className="text-muted">Expire</label>
                              <hr />
                              <DatePicker className="form-control" selected={new Date()} value={expire} required onChange={(date)=>setExpire(date)}/>
                          </div>
                          <button className="btn btn-outlined btn-primary"type="submit">Save</button>
                      </form>
                      <hr />
                     <h3>{coupons.length} Coupons</h3> 
                          <hr />
                      <table className="table table-bordered">
                          <thead className="thead light">
                              <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Expire</th>
                                  <th scope="col">Discount</th>
                                  <th scope="col">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {coupons.map((co,i)=>{
return <tr key={co._id}>
    <td>{co.name}</td>
    <td>{new Date(co.expire).toLocaleDateString()}</td>
    <td>{co.discount}</td>
    <td><DeleteOutlined className="text-danger pointer" onClick={()=>handleRemove(co._id)}/></td>
</tr>
                              })}
                          </tbody>
                      </table>
                </div>
            </div>
          
            
        </div>
    )
}

export default CreateCouponPage
