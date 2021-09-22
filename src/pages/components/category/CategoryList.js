import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      console.log(res.data);
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => {
    return categories.map((c) => (
      <div
        key={c._id}
        className=" col btn btn-dark btn-lg btn-block btn-raise m-3 fw-bold">
        <Link className="text-light" to={`/category/${c.slug}`}>
          {c.name}
        </Link>
      </div>
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
