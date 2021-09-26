import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        <span>Order Id: {order.paymentIntent.id}</span>{" "}
        <span>
          Amount:{" "}
          {order.paymentIntent.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        {" / "}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        {" / "}
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        {" / "}
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        {" / "}
        <span>
          Ordered on:{" / "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString("vi-Vi")}
        </span>
        <br />
        {showStatus && (
          <span className="badge bg-info text-white">
            STATUS: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
