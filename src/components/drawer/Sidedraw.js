import React from 'react'
import{Drawer, Button} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import laptop from '../../../src/images/lap1.jpg'
import {Link} from 'react-router-dom'
function Sidedraw() {
     const dispatch = useDispatch()
     const{drawer,cart}= useSelector((state)=>({...state}))
     const imageStyle={
         width:"100%",
         height:"50px",
         objectFit:"cover"
     }
    return (
        <Drawer 
        placement="right"
        title={`Cart / ${cart.length} Product`}
        className="text-center" 
        visible={drawer}
         onClose={()=>{
            dispatch({type:"SET_VISIBLE",payload:false})
        }}>
          {cart.map((p)=>{
            return  <div className="row"key={p._id}>
                  <div className="col">
                      {p.images[0] ?(<>
                          <img src={p.images[0].url}alt=""style={imageStyle} />
                          <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                          </>
                      ):(<>
                      <img src={laptop}alt=""style={imageStyle}/>
                       <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p></>
                       )
                       }
                  </div>
              </div>
          })} 
          <Link to="/cart">
          <Button className="btn btn-primary text-center btn-raised"onClick={()=>{
              dispatch({
                  type:"SET_VISIBLE",
                  payload:false
              })
          }}>Go to Cart</Button>
          </Link>

        </Drawer>
    )
}

export default Sidedraw
