import React, { useEffect, useState } from "react";
import { getProductByCount } from "../functions/product";
import ProductCard from "./components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row">
            {products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
