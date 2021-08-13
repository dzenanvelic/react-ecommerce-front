import React, {useState} from 'react'
import{Modal,Button} from 'antd'
import {toast}from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined}from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
function RatingModal({children}) {
    const {user} = useSelector((state)=>({...state}))
    const{slug}= useParams()
    const history= useHistory()
        const [modalVisible, setModalVisible]= useState(false)
        const handleModal=()=>{
            if(user && user.token){
                setModalVisible(true)
            }else{
                history.push({
                    pathname:'/login',
                    state:{from:`/product/${slug}`},
                })
            }
        }
    return (<>
    <div onClick={handleModal}>
        <StarOutlined className="text-danger"/> <br />{""}
        {user ? "Leave Rating" : "Login to Leave Rating"}
        </div>

        <Modal title="Leave your rating" centered visible={modalVisible} onOk={()=>{setModalVisible(false) 
            toast.success("Thanks for your review") }}onCancel={()=>(setModalVisible(false))} >{children}</Modal>
    </>)
}

export default RatingModal
