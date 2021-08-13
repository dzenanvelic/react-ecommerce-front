import React from 'react'

function ShowPaymentInfo({order,showStatus=true}) {
    return (
        <div>
          
              <span>Order Id: {order.paymentIntent.id}</span>{' /'}
              <span>Amount: {(order.paymentIntent.amount / 100).toLocaleString("en-US",{style:"currency", currency:"USD"})}</span>{' /'}<span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{"/ "}<span>Method: {order.paymentIntent.payment_method_types[0]}</span>{"/ "}<span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
              {"/ "}  <span>Date: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{"/ "}
              <br />
             {showStatus ? ( <span className="badge bg-danger text-white">Status: {order.orderStatus}</span> ) : ('')}
        </div>
    )
}

export default ShowPaymentInfo
