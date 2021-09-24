import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionTypes } from "../actions/types";
import { emptyUserCart, getUserCart } from "../functions/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  // Save
  const saveAddressToDb = () => {
    //
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address</h4>
        <br />
        <br />
        textarea
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <div className="d-flex">
          Products:{" "}
          {loading ? <Skeleton.Button size="small" active /> : products.length}
        </div>
        <hr />
        {loading ? (
          <Skeleton active />
        ) : (
          products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
              </p>
            </div>
          ))
        )}
        <hr />
        <p>
          Cart Total: <b>${total}</b>
        </p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
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
