import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionTypes } from "../actions/types";
import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../functions/user";
import ReactQuill from "react-quill";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setLoading(false);
    });
    // }, 1000);
  }, [user.token]);

  const handleEmpty = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // remove from redux
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: [],
    });

    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      setDiscountError("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  // Save
  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
      </>
    );
  };

  const showProductSummary = () => {
    return loading ? (
      <Skeleton active />
    ) : (
      products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
          </p>
        </div>
      ))
    );
  };

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token)
      .then((res) => {
        if (res.data) {
          setTotalAfterDiscount(res.data.totalAfterDiscount);
          // update redux coupon applies
        }
      })
      .catch((err) => {
        setDiscountError(err.response.data);
        // update redux coupon applies
      });
  };

  const onCouponChange = (e) => {
    setCoupon(e.target.value);
    setDiscountError("");
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          type="text"
          onChange={onCouponChange}
          value={coupon}
          className="form-control"
          placeholder="Enter your coupon"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-light mt-2">
          Apply
        </button>
      </>
    );
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <br />
        <h4>Got Coupon?</h4>
        {showApplyCoupon()}
        {discountError && <p className="text-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <div className="d-flex">
          Products:{" "}
          {loading ? <Skeleton.Button size="small" active /> : products.length}
        </div>
        <hr />
        {showProductSummary()}
        <hr />
        <p>
          Cart Total: <b>${total}</b>
        </p>
        {totalAfterDiscount > 0 && (
          <p className="text-success">
            Discount Applied - Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!addressSaved || !products.length}
              className="btn btn-primary">
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={handleEmpty}
              className="btn btn-primary">
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
