import React, { useEffect, useState } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../components/cards/ProductCard";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((s) => {
      setSub(s.data.sub);
      setProducts(s.data.products);
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
              : `${products.length} ${
                  products.length > 1 ? "products" : "product"
                } in "${sub?.name}" sub category`}
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

export default SubHome;
