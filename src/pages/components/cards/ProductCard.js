import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../../images/laptop.png";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      className="m-2"
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
        <>
          <ShoppingCartOutlined className="text-success" />
          <br /> View Product
        </>,
      ]}>
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
