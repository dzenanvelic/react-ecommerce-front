import React from 'react'
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import laptopDefaultImage from '../../images/lap1.jpg'
import {Link}from 'react-router-dom'
import{EditOutlined, DeleteOutlined} from '@ant-design/icons'


const { Meta } = Card;
function AdminProductCard({product,handleRemove}) {
   
    
    const{title,description,images,slug}=product
    


    
    return (
        
           <Card  cover={<img style={{ height: 150 ,objectFit:"cover"}} className='p-2' src={images && images.length ? images[0].url : laptopDefaultImage}/>}
actions={[
   <Link to={`/admin/product/${slug}`}><EditOutlined /></Link> ,<DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>
]}>
<Meta title={title} description={`${description && description.substring(0,20)}...`}/>
           </Card>
      
    )
}

export default AdminProductCard
