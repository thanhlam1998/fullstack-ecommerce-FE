import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import laptop from "../../../images/laptop.png";
import ProductListItem from "./ProductListItem";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, images } = product;
  return (
    <div className="row">
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop stopOnHover>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} alt="" />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img src={laptop} className="mb-3 card-image" alt="" />
            }></Card>
        )}
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-danger" /> <br /> Add to Wishlist
            </Link>,
          ]}>
          <ProductListItem product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
