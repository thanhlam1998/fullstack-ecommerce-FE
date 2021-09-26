import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import { isEqual, uniqWith } from "lodash";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { actionTypes } from "../../../actions/types";
import { showAverage } from "../../../functions/rating";
import { addToWishList } from "../../../functions/user";
import laptop from "../../../images/laptop.png";
import RatingModal from "../modal/RatingModal";
import ProductListItem from "./ProductListItem";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star, handleRate }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { title, images, description, _id } = product;

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  // router
  const history = useHistory();

  const handleAddToCart = () => {
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

      // Show cart items inside drawer
      dispatch({
        type: actionTypes.SET_VISIBLE,
        payload: true,
      });
    }
  };

  const handleRateWrapper = () => {
    handleRate(_id);
  };

  const handleAddToWishList = () => {
    addToWishList(_id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("ADDED TO WISHLIST");
      history.push("/user/wishlist");
    });
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
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" />
                <br /> Add to Cart
              </div>
            </Tooltip>,
            <div onClick={handleAddToWishList}>
              <HeartOutlined className="text-danger" /> <br /> Add to Wishlist
            </div>,
            <RatingModal handleRate={handleRateWrapper}>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
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
