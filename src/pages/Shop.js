import React,{useState, useEffect} from 'react'
import {fetchProductByFilter, getProductsByCount} from '../functions/product'
import {getCategories} from '../functions/category'
import {getSubCategories} from '../functions/subcategory'
import {useSelector, useDispatch, createSelectorHook} from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import Star from '../components/forms/Star'
 import {Menu, Slider,Checkbox,Radio} from 'antd'
 import {BranchesOutlined, DollarOutlined,DownSquareOutlined,StarOutlined} from '@ant-design/icons'
import reactQuill from 'react-quill'
function Shop() {
    const [products, setProducts]= useState([])
    const[price, setPrice]=useState([0,0])
    const [loading, setLoading]= useState(false)
    const[ok,setOk]= useState(false)
    const [categories,setCategories]= useState([])
    const[catforBack,setCatforBack]= useState([])
    const[star,setStar]= useState('')
    const[subs, setSubs]= useState([])
    const [sub,setSub]= useState('')
    const[brands,setBrands]= useState(["HP",'Lenovo','ASSUS','Acer','Microsoft','Toshiba','ALIEN','Samsung','Apple'])
    const [brand,setBrand]= useState('')
    const[colors,setColors]= useState(["Black",'Silver','White','Blue','Red','Brown','Pink','Many'])
    const [color, setColor]= useState('')
    const[shipping, setShipping]=useState('')

const{search}= useSelector((state)=>({...state}))
const{text}= search
const dispatch=useDispatch()
const{SubMenu}=Menu
    useEffect(()=>{
        loadAllProducts()
        //fetchCategories
        getCategories()
        .then(res=>setCategories(res.data))
        //get subcategories
        getSubCategories()
        .then(res=>setSubs(res.data))
    },[])
const fetchProducts=(arg)=>{
    fetchProductByFilter(arg)
.then(res=>setProducts(res.data))
}
    //1. load products on page default
    const loadAllProducts=()=>{
        setLoading(true)
        getProductsByCount(12)
        .then(res=>{
            setProducts(res.data)
            setLoading(false)
        })
    }
    //2.load product on user search input
    useEffect(()=>{
        const delayed = setTimeout(()=>{
fetchProducts({query:text})
if(!text){
        loadAllProducts()
    }
        },300)
return()=> clearTimeout(delayed)

    },[text])
    

//3. load products based on price
useEffect(()=>{
   // console.log("ok to request");
fetchProducts({price})
},[ok])
const handleSlider=(value)=>{
    dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    //reset values
    setCatforBack([])
setPrice(value)
setStar('')
setSub('')
setBrand('')
setColor('')
setShipping('')
setTimeout(()=>{
setOk(!ok)
},300)
}
//4.load products badsed on catagory
//show catagory in a list
const handleCheck=(e)=>{
    //reset search to null
    dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setStar('')
    setSub('')
    setBrand('')
    setColor('')
    setShipping('')
//console.log(e.target.value);
let inTheState =[...catforBack]
let justChecked = e.target.value
let foundInTheState = inTheState.indexOf(justChecked)// index or -1(if not found) back

if(foundInTheState === -1){
    inTheState.push(justChecked)
}else{
    //if found pull out one item from index
    inTheState.splice(foundInTheState,1)
}
setCatforBack(inTheState)
//console.log("IN THE STATE ===>",inTheState);
fetchProducts({category:inTheState})
}
   // 5.products by star rating
   const handleStarClick=(num)=>{
      // console.log("NUMBER",num);
        dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setCatforBack([])
    setSub('')
    setStar(num)
    setBrand('')
    setColor('')
    setShipping('')
    fetchProducts({stars:num})
   }
const showStars=()=>(
    <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5}/>
        <Star starClick={handleStarClick} numberOfStars={4}/>
        <Star starClick={handleStarClick} numberOfStars={3}/>
        <Star starClick={handleStarClick} numberOfStars={2}/>
        <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
)
//.6 show sub categories

const handleSub=(sub)=>{
//console.log("SUB",sub);
setSub(sub)
 dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setCatforBack([])
    setStar('')
    setBrand('')
    setColor('')
    setShipping('')
    fetchProducts({sub})
}
//7. show product based on brands
const handleBrand=(e)=>{
    setBrand(e.target.value)
    setSub('sub')
 dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setCatforBack([])
    setStar('')
    setColor('')
    setShipping('')
    fetchProducts({brand:e.target.value})
}
//8.filter by colors 
const handleColor =(e)=>{
setBrand(e.target.value)
    setSub('')
 dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setCatforBack([])
    setStar('')
    setColor(e.target.value)
    setShipping('')
    fetchProducts({color:e.target.value})
}
//9 show product based on shipping
const showShipping=()=>{
   return <>
<Checkbox className="pb-2 pt-4 pr-4"onChange={handleShippingChange} value="Yes" checked={shipping=== "Yes"}>Yes</Checkbox>
<Checkbox className="pb-2 pt-4 pr-4"onChange={handleShippingChange} value="No" checked={shipping=== "No"}>No</Checkbox>

    </>
}
const handleShippingChange=(e)=>{
    setBrand('')
    setSub('')
 dispatch({type:"SEARCH_QUERY", payload:{text:''}})
    setPrice([0,0])
    setCatforBack([])
    setStar('')
    setColor('')
    setShipping(e.target.value)
    fetchProducts({shipping:e.target.value})
}
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
<h4>Search/Filter</h4>
<hr />
<Menu mode='inline' defaultOpenKeys={['1','2','3','4','5','6','7']}>
    {/* price */}
    <SubMenu key="1" title={<span className='h6'><DollarOutlined/> Price</span>}>
<div>
    <Slider className="ml-4 mr-4" tipFormatter={(v)=>`$${v}`} range value={price} onChange={handleSlider} max="4999"/>
</div>
    </SubMenu>
    {/* category */}
    <SubMenu key="2" title={<span className='h6'><DownSquareOutlined/>Categories</span>}>
<div style={{marginTop:"-10px",height:'150px', overflow:"scroll"}}>
    {categories.map((cat) => {
  return  <div key={cat._id}>
 <Checkbox checked={catforBack.includes(cat._id)} onChange={handleCheck} className="pb-2 pl-4 pr-4" value={cat._id} name="category">{cat.name}</Checkbox>
  <br />
        </div>
      
     }
)}
</div>
    </SubMenu>
    <SubMenu key="3" title={<span className='h6'><StarOutlined/>Rating</span>}>
<div style={{marginTop:"-10px"}}>
   {showStars()}
</div>
    </SubMenu>
    {/*sub  categories */}
    <SubMenu key="4" title={<span className='h6'><DownSquareOutlined/>Sub Categories</span>}>
<div style={{marginTop:"-10px"}}>
    {
subs.map((s)=>{
    return <div key={s._id} style={{cursor:'pointer'}} className="badge badge-secondary p-1 m-1 " onClick={()=>handleSub(s)}>{s.name}</div>
})
}
</div>
    </SubMenu>
    {/*brands */}
    <SubMenu key="5" title={<span className='h6'><DownSquareOutlined/>Brands</span>}>
<div style={{marginTop:"-10px",width:'100px'}} className="pr-5">
    {
brands.map((b)=>{
    return <Radio key={b} value={b}  name={b} checked={b === brand} onChange={handleBrand} >{b}</Radio>
})
}
</div>
    </SubMenu>
    {/*colors */}
    <SubMenu key="6" title={<span className='h6'><DownSquareOutlined/>Colors</span>}>
<div style={{marginTop:"-10px",width:'100px'}} className="pr-5">
    {
colors.map((c)=>{
    return <Radio key={c} value={c}  name={c} checked={c === color} onChange={handleColor} >{c}</Radio>
})
}
</div>
    </SubMenu>
    {/*colors */}
    <SubMenu key="7" title={<span className='h6'><DownSquareOutlined/>Shipping</span>}>
<div style={{marginTop:"-10px"}} className="pr-2">
    {
showShipping()
}
</div>
    </SubMenu>
</Menu>
                </div>
                <div className="col-md-9 pt-2">
{loading ? (<h4 className="text-danger">Loading...</h4>):(<h4 className="text-danger">Products</h4>)}

{products.length < 1 && <p>No products find</p>}
<div className="row pb-4">
    {products.map((prod)=>{
        return <div key={prod._id} className=" col-md-4 mt-3" ><ProductCard product={prod}/> </div>
    })
    }
</div>
                </div>
            </div>
            
        </div>
    )
}

export default Shop
