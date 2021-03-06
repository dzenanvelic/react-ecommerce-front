import React,{useEffect,useState} from 'react'
import {getProducts,getProductsCount} from '../../functions/product'
import {Pagination} from 'antd'
import ProductCard from '../cards/ProductCard'
import Jumbotron from '../cards/Jumbotron'
 import LoadingCard from '../cards/LoadingCard'
function BestSellers() {
    const[products,setProducts]= useState([])
    const[loading, setLoading]= useState(false)
 const [productsCount, setProductsCount]=useState(0)
    const [page,setPage]= useState(1)

    useEffect(()=>{
loadAllProducts()
    },[page])

    useEffect(()=>{
getProductsCount()
.then((res)=>setProductsCount(res.data))
.catch((err)=>
console.log("GET BEST SELLERS ERROR",err)
)
    },[])
    const loadAllProducts=()=>{
        setLoading(true)
        getProducts('sold','desc',page)
        .then((res)=>{
            setLoading(false)
setProducts(res.data)
        })
    }
    return (<>
    
      
        
        <div className="container">
            {loading ? <LoadingCard count={3}/> :  <div className="row">
                {products.map((product)=>{
                    return <div className="col-md-4" key={product._id}><ProductCard product={product}/> </div>
                })}
               
            </div>}
           
        </div>
         <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                 <Pagination current={page} total={(productsCount / 3 ) * 10} onChange={value=>setPage(value)}/>
            </nav>
        </div>
  </>  )
}

export default BestSellers

