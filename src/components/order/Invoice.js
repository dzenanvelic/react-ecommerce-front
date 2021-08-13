import React from 'react'
import { Document, Page, Text, View, StyleSheet,PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons'
function Invoice({order}) {

   // console.log("ORDER",order)
    return (
      <Document>
                <Page size="A4">

  <View>
       <Text>Title </Text>
 {/* <table className="table table-bordered" >
      <thead className="thead-light">
<tr>
    <th className="col">  <Text>Title </Text></th>
    <th className="col">  <Text>Price </Text></th>
    <th className="col">  <Text>Brand </Text></th>
    <th className="col">  <Text>Color </Text></th>
    <th className="col">  <Text>Count </Text></th>
    <th className="col">  <Text>Shipping </Text></th>
</tr>
      </thead>
      <tbody>
          {order.products.map((p,i)=>{
return <tr key={i}>
    <td> <Text><b>{p.product.title}</b> </Text></td>
    <td>  <Text>{p.product.price} </Text></td>
    <td>  <Text>{p.product.brand} </Text></td>
    <td>  <Text>{p.product.color} </Text></td>
    <td>  <Text>{p.count} </Text></td>
    <td>  <Text>{p.shipping === "Yes" ? <CheckCircleOutlined style={{color:'green'}}/>: <CloseCircleOutlined style={{color:'red'}}/>} </Text></td> 
</tr>
          })}
      </tbody>
  </table> */}
   
 </View>
                </Page>
            </Document>
    )
}

export default Invoice
