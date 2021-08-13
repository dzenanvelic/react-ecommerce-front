import React from 'react'
import {Select}from 'antd'
const {Option} = Select
function ProductCreateForm({handleChange,handleSubmit,values,handleCategoryChange,subOptions,setSubOptions,showSub,setValues}) {
  const{title,description,price,category,subs,shipping,quantity,images,colors,color,brands,brand,ratings,categories}= values
    return (
       <form  className="form-group" onSubmit={handleSubmit}>
<label >Title</label>
<input type="text" name='title' className="form-control" value={title} onChange={handleChange}/>
<label >Description</label>
<input type="text" name='description' className="form-control" value={description} onChange={handleChange}/>
<label >Price</label>
<input type="number" name='price' className="form-control" value={price} onChange={handleChange}/>
<select name="shipping" className="form-control" onChange={handleChange}>
    <option >Please select shipping</option>
<option value="No">No</option>
<option value="Yes">Yes</option>
</select>
<label >Enter quantity</label>
<input type="number" name='quantity' className="form-control" value={quantity} onChange={handleChange}/>
<select name="color" className="form-control" onChange={handleChange}>
    <option >Please select color</option>
{colors.map((c)=>{
    return <option key={c} value={c}>{c}</option>
})}
</select>
<select name="brand" className="form-control" onChange={handleChange}>
    <option >Please select brand</option>
{brands.map((b)=>{
    return <option key={b} value={b}>{b}</option>
})}
</select>
 <select name="category" className="form-control" onChange={handleCategoryChange}>
    <option >Please select category</option>
{categories.length > 0 && categories.map((c)=>{
    return <option key={c._id} value={c._id}>{c.name}</option>
})}
</select> 
{showSub && <div>
    <label >Subcategories</label>
    <Select
    mode="multiple"
    style={{width:'100%'}}
    value={subs}
    onChange={(value)=>setValues({...values,subs:value})}
    
    >{subOptions.length && subOptions.map((s)=>{
        return <Option key={s._id} value={s._id}>{s.name}</Option>
    })}
        
       
    </Select>
</div>}

<br />
<button className="btn btn-outline-info">Save</button>

</form>

    )
    
}

export default ProductCreateForm
