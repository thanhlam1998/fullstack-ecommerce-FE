import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "./components/cards/ProductCardInCheckout";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const showCartItem = () => {
    return (
      <table className="table table-bordered">
        <colgroup>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col className="col-1"></col>
          <col></col>
          <col></col>
        </colgroup>
        <thead className="table-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} product={p} />
        ))}
      </table>
    );
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <h4>Cart / {cart.length} Products</h4>
      </div>
      <div className="row">
        <div className="col-xxl-8">
          {!cart.length ? (
            <h4>
              No products in cart.
              <Link to="/shop">Continue shopping?</Link>
            </h4>
          ) : (
            showCartItem()
          )}
        </div>
        <div className="col-xxl-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-info mt-2"
              disabled={!cart.length}>
              Proceed to checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-info mt-2">
              <Link
                className="text-light"
                to={{
                  pathname: "/login",
                  state: { from: "/cart" },
                }}>
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
