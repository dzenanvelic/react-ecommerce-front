import React from 'react'
import Resizer from "react-image-file-resizer";
import axios from 'axios'
import { Avatar,Badge} from 'antd';
import { useSelector } from 'react-redux';
function FileUpload({values,setValues,setLoading}) {
const {user}= useSelector((state)=>({...state}))
    const fileUploadAndResize=(e)=>{
//console.log(e.target.files);
//resize
const files = e.target.files
const allUpoadedFiles=values.images
if(files){
    setLoading(true)
  for(let i=0; i<files.length; i++){
      Resizer.imageFileResizer(files[i],720,720,'JPEG',100,0,(uri)=>{
         axios.post(`http://localhost:8000/api/uploadimages`,{image:uri},{headers:{
             authtoken:user ? user.token : ''
         }})
         .then(res=>{
             setLoading(false)
             console.log("IMAGE UPLOAD RESPONSE DATA",res);
             allUpoadedFiles.push(res.data)
             setValues({...values, images:allUpoadedFiles})
         })
         .catch(err=>{
             setLoading(false)
             console.log("CLOUDINARY IMAGES UPLOAD ERROR",err);
         })
      },'base64')
  }
}
//send back to server to updt cloud

//send url to images in parent comp -Product Create
    }
    const handleImageRemove=(public_id)=>{
setLoading(true)
axios.post(`http://localhost:8000/api/removeimage`,{public_id},{headers:{
    authtoken:user ? user.token : ''
},
})
.then((res)=>{
    setLoading(false)
const {images} = values
let filteredImagesNo = images.filter((item)=>{
    return item.public_id !== public_id
})
setValues({...values,images: filteredImagesNo})
})
.catch(err=>{
    console.log(err)
setLoading(false)})
    }
    return (<>
    <div className="row">
        {values.images && values.images.map((image)=>{
            return<Badge count="X"key={image.public_id} onClick={()=>handleImageRemove(image.public_id)}style={{ cursor: "pointer" }} >
                <Avatar  src={image.url} size={70} className="ml-3" shape="square"  /> 
            </Badge> 
        })}
    </div>
        <div className="row">
            <label className="btn btn-primary">Choose image file
            <input type="file" multiple accept="images/*" onChange={fileUploadAndResize} hidden/>
            </label>
        </div>
  </>  )
}

export default FileUpload
