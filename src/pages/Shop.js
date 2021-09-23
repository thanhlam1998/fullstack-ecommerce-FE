import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import ProductCard from "./components/cards/ProductCard";
import { Checkbox, Menu, Slider } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useDidMountEffect } from "../hooks/useDidUpdateEffect";
import { getCategories } from "../functions/category";
import Star from "./components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

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
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const sliderChange = (value) => {
    // dispatch({
    //   type: actionTypes.SEARCH_QUERY,
    //   payload: { text: "" },
    // });
    // setCategoryIds([]);
    setPrice(value);
  };

  // Show categories as a list of checkboxes
  useDidMountEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price });
    }, 300);
    return () => clearTimeout(delayed);
  }, [price]);

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
    // dispatch({
    //   type: actionTypes.SEARCH_QUERY,
    //   payload: { text: "" },
    // });
    // setPrice([0, 0]);

    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
  };

  useDidMountEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ category: categoryIds });
    }, 300);
    return () => clearTimeout(delayed);
  }, [categoryIds]);

  // Show products by star rating
  const handleStarClick = (num) => {
    // dispatch({
    //   type: actionTypes.SEARCH_QUERY,
    //   payload: { text: "" },
    // });
    // setPrice([0, 0]);
    // setCategoryIds([]);
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => {
    return (
      <div className="ps-4 pe-4 pb-2">
        {[5, 4, 3, 2, 1].map((num) => (
          <Star key={num} handleClick={handleStarClick} numberOfStars={num} />
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3"]} mode="inline">
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
                  onChange={sliderChange}
                  range
                  value={price}
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
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined className="me-2" />
                  Rating
                </span>
              }>
              {showStars()}
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
