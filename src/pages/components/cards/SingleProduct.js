import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Tabs } from "antd";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import laptop from "../../../images/laptop.png";
import ProductListItem from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description, _id } = product;

  const changeRating = (newRating, name) => {
    console.log("newRating", newRating, "name", name);
  };

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
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxx-xxx-xxx to get more about the product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h2 className="bg-info p-3">{title}</h2>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-danger" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                rating={2}
                numberOfStars={5}
                changeRating={changeRating}
                name={_id}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}>
          <ProductListItem product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
