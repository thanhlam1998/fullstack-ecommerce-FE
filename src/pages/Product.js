/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProduct, getRelated, productStar } from "../functions/product";
import ProductCard from "./components/cards/ProductCard";
import SingleProduct from "./components/cards/SingleProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadingSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user star
    }
  }, [user]);

  const loadingSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // Load related products
      getRelated(res.data._id).then((res) => {
        setRelated(res.data);
      });
    });
  };

  const onStarClick = (newRating) => {
    setStar(newRating);
  };

  const handleRate = (name) => {
    productStar(name, star, user.token).then((res) => {
      toast.success("Thanks for your review !");
      loadingSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          handleRate={handleRate}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No product found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
