import React,{useEffect,useState} from 'react'
import UserNav from '../../components/nav/UserNav'
import {useSelector,useDispatch} from 'react-redux'
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
import {getUserOrders} from '../../functions/user'
import {toast} from 'react-toastify'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import { PDFDownloadLink, Document, Page, Text, View,StyleSheet} from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice'
function History() {
  
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text:{
      textAlign:"center"
  }
});
    const [orders,setOrders]= useState([])
    const {user}= useSelector((state)=>({...state}))

    useEffect(()=>{
       getUserOrders(user.token)
       .then(res=>{
           //console.log("ORDERS",res.data)
           setOrders(res.data)
       })
    },[])
const showOrderInTable=(order)=>{
  return  <table className="table table-bordered" >
      <thead className="thead-light">
<tr>
    <th className="col">Title</th>
    <th className="col">Price</th>
    <th className="col">Brand</th>
    <th className="col">Color</th>
    <th className="col">Count</th>
    <th className="col">Shipping</th>
</tr>
      </thead>
      <tbody>
          {order.products.map((p,i)=>{
return <tr key={i}>
    <td><b>{p.product.title}</b></td>
    <td>{p.product.price}</td>
    <td>{p.product.brand}</td>
    <td>{p.product.color}</td>
    <td>{p.count}</td>
    <td>{p.shipping === "Yes" ? <CheckCircleOutlined style={{color:'green'}}/>: <CloseCircleOutlined style={{color:'red'}}/>}</td>
</tr>
          })}
      </tbody>
  </table>
}
    const showEachOrders=()=>orders.map((order,i)=>{
        return <div key={i} className="m-5 p-3 card">
           <ShowPaymentInfo order={order}/>
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    {showDownloadPdf(order)}
                </div>
            </div>
            

        </div>
    })

    const showDownloadPdf=(order)=>{
        console.log("ORDER LOG",order)
      return  <PDFDownloadLink document={<Document>
          <Page size="A4"style={styles.page}>
<View style={styles.section}>
  <Text>Created:{(order.createdAt).toLocaleString()} </Text>
   </View>
<View style={styles.section}>
  <Text style={styles.text}>Order Status :{order.orderStatus} </Text>
   </View>
<View style={styles.section}>
  <Text style={styles.text}>Products: {order.products.map((p,i)=><div key={i} style={{display:"flex",flexDirection:"column",marginBottom:"5px"}}>
      <p ><b>title:</b> {p.product.title}/</p>
      <p><b>price:</b> ${p.product.price}/</p>
      <p><b>color:</b> {p.product.color}/</p>
      <p><b>count:</b>"{p.count}"</p>
      <br />
      <hr />
  </div>)} </Text>
   </View>
<View style={styles.section}>
  <Text style={styles.text}>Amount$ :{(order.paymentIntent.amount) /100} </Text>
   </View>
<View style={styles.section}>
  <Text style={styles.text}>Order ID :{(order._id) } </Text>
   </View>
    </Page>
      </Document>} className="btn btn-sm btn-block btn-outline-primary" fileName="invoice.pdf">
            Download PDF
        </PDFDownloadLink>
   
  

         
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"><UserNav/></div>
                <div className="col text-center ">
                    <h4>{orders.length > 0 ? "User purchase orders" : "No purchase orders"}</h4>
{showEachOrders()}
                </div>
            </div>
        </div>
    )
}

export default History
