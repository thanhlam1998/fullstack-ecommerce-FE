import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPaymentIntent } from "../../functions/stripe";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Card } from "antd";
import { createOrder, emptyUserCart } from "../../functions/user";
import { actionTypes } from "../../actions/types";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      setClientSecret(res.data.clientSecret);
      // additional receive from successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // get result after successful payment
      // create order and save in db for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          // empty cart from redux
          dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: [],
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable any button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              {`Total after discount: $${totalAfterDiscount}`}
            </p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={laptop}
              alt="laptop"
              style={{ height: 200, objectFit: "cover", marginBottom: "-50px" }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-success" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-success" /> <br /> Total payable: $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}>
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p
          className={
            succeeded ? "result-message text-success" : "result-message hidden"
          }>
          Payment Successful.
        </p>
        <Link to="/user/history">Click to see your purchase history.</Link>
      </form>
    </>
  );
};

export default StripeCheckout;
