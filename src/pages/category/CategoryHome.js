import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCategory(c.data.category);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2 className="text-center mt-5 mb-5 jumbotron bg-info text-light">
            {loading
              ? "Loading..."
              : `${products.length} Products in "${category?.name}" category`}
          </h2>
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
