import React from 'react'
import {Select}from 'antd'
const {Option} = Select
function ProductUpdateForm({handleChange,categories,handleSubmit,values,setValues,handleCategoryChange,subOptions,arrayOfSubIds,setArrayOfSubIds,selectedCategory}) {
  const{title,description,price,category,subs,shipping,quantity,images,colors,color,brands,brand,ratings}= values
    return (
       <form  className="form-group" onSubmit={handleSubmit}>
<label >Title</label>
<input type="text" name='title' className="form-control" value={title} onChange={handleChange}/>
<label >Description</label>
<input type="text" name='description' className="form-control" value={description} onChange={handleChange}/>
<label >Price</label>
<input type="number" name='price' className="form-control" value={price} onChange={handleChange}/>
<label >Shipping</label>
<select value={shipping } name="shipping" className="form-control" onChange={handleChange}>
    <option >Please select shipping</option>
<option value="No">No</option>
<option value="Yes">Yes</option>
</select>
<label >Enter quantity</label>
<input type="number" name='quantity' className="form-control" value={quantity} onChange={handleChange}/>
<label >Color</label>
<select value={color} name="color" className="form-control" onChange={handleChange}>
    
{colors.map((c)=>{
    return <option key={c} value={c}>{c}</option>
})}
</select>
<label >Brand</label>
<select value={brand} name="brand" className="form-control" onChange={handleChange}>
    <option >Please select brand</option>
{brands.map((b)=>{
    return <option key={b} value={b}>{b}</option>
})}
</select>
 <label>Category</label>
<select  name="category" className="form-control" onChange={handleCategoryChange} value={selectedCategory ? selectedCategory :category._id}>
   
   
{categories.length > 0 && categories.map((c)=>{
    return <option key={c._id} value={c._id}>{c.name}</option>
})}
</select> 
 <div>
    <label >Subcategories</label>
    <Select
    mode="multiple"
    style={{width:'100%'}}
    value={arrayOfSubIds}
    onChange={(value)=>setArrayOfSubIds(value)}
    
    >{subOptions.length && subOptions.map((s)=>{
        return <Option key={s._id} value={s._id}>{s.name}</Option>
    })}
        
       
    </Select>
</div>

        
       
   


<br />
<button className="btn btn-outline-info">Save</button>

</form>

    )
    
}

export default ProductUpdateForm
