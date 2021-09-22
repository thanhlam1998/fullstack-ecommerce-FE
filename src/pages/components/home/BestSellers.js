import { Pagination } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = useCallback(() => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    loadAllProducts();
  }, [page, loadAllProducts]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  const onPageChange = (value) => {
    setPage(value);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
            <Pagination
              current={page}
              total={(productsCount / 3) * 10}
              onChange={onPageChange}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
