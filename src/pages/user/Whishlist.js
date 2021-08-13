import React,{useState,useEffect} from 'react'
import UserNav from '../../components/nav/UserNav'
import {useSelector,useDispatch} from 'react-redux'
import{Link} from 'react-router-dom'
import { getWishlist, removeWishlist } from '../../functions/user'
import {toast} from 'react-toastify'
import {DeleteOutlined} from '@ant-design/icons'
function Whishlist() {
    const[wishlist,setWishlist]=useState([])
    const {user}= useSelector((state)=>({...state}))

    useEffect(()=>{
loadWhishlist()
    },[])
    const loadWhishlist=()=>{
        getWishlist(user.token)
        .then(res=>{
            //console.log("WHISLIST",res.data)
        setWishlist(res.data.wishlist)
        })
    }
    const handleRemove=(productId)=>{
removeWishlist(productId,user.token)
.then(res=>{
    toast.error("Item removed from whishlist")
loadWhishlist()
})

    }
    return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><UserNav/></div>
                <div className="col "><h4>Whishlist</h4>
               {wishlist.map((product)=>{
                   return <div key={product._id} className="alert alert-secondary">
                       <Link to={`/product/${product.slug}`}>{product.title}
                       </Link>
                       <span className="btn btn-sm float-right"onClick={()=>handleRemove(product._id)}>
                          <DeleteOutlined className="text-danger"/>
                       </span>
                   </div>
               })}
                </div>
            </div>
            </div>
    )
}

export default Whishlist
