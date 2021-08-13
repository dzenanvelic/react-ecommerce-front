import React, {useEffect, useState}from 'react'
import {Link, useParams} from 'react-router-dom'
import {getSubCategories} from '../../functions/subcategory'
function SubList() {

    const [subs, setSubs]= useState([])
    const [loading, setLoading]= useState(false)
const {slug}= useParams()
    useEffect(()=>{
loadCategories()
    },[])
    const loadCategories=()=>{
        setLoading(true)
        getSubCategories()
        .then((c) =>{
           
            setSubs(c.data)
                 setLoading(false)
                })
    }
    const showSubs = () => {
       subs.map((s)=>{
        return   <div key={s._id} className=" col btn btn-outlined-primary btn-lg  btn-raised btn-block  m-3"><Link to={`/sub/${s.slug}`}>{s.name}</Link></div>
        })
    }
        
    
    return (
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-center">Loading...</h4> :  subs.map((s)=>{
        return   <div key={s._id} className=" col btn btn-outlined-primary btn-lg  btn-raised btn-block  m-3"><Link to={`/sub/${s.slug}`}>{s.name}</Link></div>
        })}
            </div>
          {/*  {JSON.stringify(categories)}   */}
        </div>
    )
}

export default SubList
