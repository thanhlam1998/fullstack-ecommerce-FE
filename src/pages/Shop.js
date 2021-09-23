import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "./components/cards/ProductCard";
import { Checkbox, Menu, Slider } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actionTypes } from "../actions/types";
import { useDidMountEffect } from "../hooks/useDidUpdateEffect";
import { getCategories } from "../functions/category";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const textDebounce = useDebounce(text, 800);
  const dispatch = useDispatch();

  // Load products by default on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (query) => {
    fetchProductsByFilter(query).then((res) => {
      setProducts(res.data);
    });
  };

  // Load product on user search input
  useDidMountEffect(() => {
    fetchProducts({ query: textDebounce });
  }, [textDebounce]);

  // Load products based on price range
  useDidMountEffect(() => {
    fetchProducts({ price });
  }, [price]);

  const sliderAfterChange = (value) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice(value);
  };

  // Show categories as a list of checkboxes
  const showCategories = () => {
    return categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
          className="pb-2 ps-4 pe-4">
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  };

  // Handle check for categories
  const handleCheck = (e) => {
    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined className="me-2" />
                  Price
                </span>
              }>
              <div>
                <Slider
                  className="ms-4 me-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  onAfterChange={sliderAfterChange}
                  max={10000}
                />
              </div>
            </SubMenu>
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined className="me-2" />
                  Categories
                </span>
              }>
              <div>{showCategories()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
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
