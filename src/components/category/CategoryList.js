import React, {useEffect, useState}from 'react'
import {Link, useParams} from 'react-router-dom'
import {getCategories} from '../../functions/category'
function CategoryList() {

    const [categories, setCategories]= useState([])
    const [loading, setLoading]= useState(false)
const {slug}= useParams()
    useEffect(()=>{
loadCategories()
    },[])
    const loadCategories=()=>{
        setLoading(true)
        getCategories()
        .then((c) =>{
           
            setCategories(c.data)
                 setLoading(false)
                })
    }
    const showCategories = () => {
       categories.map((c)=>{
        return   <div key={c._id} className=" col btn btn-outlined-primary btn-lg  btn-raised btn-block  m-3">{c.name}</div>
        })
    }
        
    
    return (
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-center">Loading...</h4> :  categories.map((c)=>{
        return   <div key={c._id} className=" col btn btn-outlined-primary btn-lg  btn-raised btn-block  m-3"><Link to={`/category/${c.slug}`}>{c.name}</Link></div>
        })}
            </div>
          {/*  {JSON.stringify(categories)}   */}
        </div>
    )
}

export default CategoryList
