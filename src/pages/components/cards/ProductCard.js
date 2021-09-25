import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Card, Tooltip } from "antd";
import { isEqual, uniqWith } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actionTypes } from "../../../actions/types";
import { showAverage } from "../../../functions/rating";
import laptop from "../../../images/laptop.png";

const { Meta } = Card;

const ProductCard = ({ product, badge }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();

  // destructure
  const { title, description, images, slug, price, quantity } = product;

  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast.warn("Out of stock. Please back later");
      return;
    }
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // If cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicate
      const unique = uniqWith(cart, isEqual);
      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      // Show tooltip
      setTooltip("Added");

      // Add to redux state
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: unique,
      });

      toast.success("Added to cart");
    }
  };

  const cardItem = (
    <Card
      cover={
        <img
          alt={title}
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-info" /> <br /> View Product
        </Link>,
        <Tooltip title={tooltip}>
          <div onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-success" />
            <br /> {quantity > 0 ? "Add to Cart" : "Out of stock"}
          </div>
        </Tooltip>,
      ]}>
      <Meta
        title={`${title} - $${price}`}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <div className="m-2">
        {badge ? (
          <Badge.Ribbon
            placement="start"
            text={<b>{badge?.text}</b>}
            color={badge?.color}>
            {cardItem}
          </Badge.Ribbon>
        ) : (
          cardItem
        )}
      </div>
    </>
  );
};

export default ProductCard;
