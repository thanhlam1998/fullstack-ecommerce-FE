import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actionTypes } from "../../../actions/types";
import { COLORS } from "../../../config/constant";
import laptop from "../../../images/laptop.png";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ product }) => {
  const { title, price, brand, color, count, shipping, images, _id, quantity } =
    product;
  const dispatch = useDispatch();
  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.forEach((product, i) => {
        if (product._id === _id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];

    if (count > quantity) {
      count = quantity;
      toast.error(`Max available quantity: ${quantity}`);
    }
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach((product, i) => {
          if (product._id === _id) {
            cart[i].count = count;
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: cart,
        });
      }
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach((product, i) => {
          if (product._id === _id) {
            cart.splice(i, 1);
          }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: cart,
        });
      }
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: 100 }}>
            {images.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>
          <select
            className="form-select"
            name="color"
            onChange={handleColorChange}>
            {color ? (
              <option value={color}>{color}</option>
            ) : (
              <option>Select</option>
            )}
            {COLORS.filter((c) => c !== color).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            value={count}
            className="form-control"
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseCircleFilled onClick={handleRemove} className="text-danger " />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
