import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => {
    return categories.map((c) => (
      <Link
        className=" col btn btn-dark btn-lg btn-block btn-raise m-3 fw-bold"
        key={c._id}
        to={`/category/${c.slug}`}>
        {c.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4>Loading...</h4> : showCategories()}
      </div>
    </div>
  );
};

export default CategoryList;
