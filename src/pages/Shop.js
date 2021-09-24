import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import ProductCard from "./components/cards/ProductCard";
import { Checkbox, Menu, Radio, Slider } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagsOutlined,
  AimOutlined,
  BgColorsOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useDidMountEffect } from "../hooks/useDidUpdateEffect";
import { getCategories } from "../functions/category";
import Star from "./components/forms/Star";
import { getSubs } from "../functions/sub";
import { actionTypes } from "../actions/types";
import { useDebounce } from "../hooks/useDebounce";

const { SubMenu } = Menu;
const colors = ["Black", "Brown", "Silver", "White", "Blue"];
const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
const shippings = ["Yes", "No"];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const priceDebounce = useDebounce(price, 800);
  const textDebounce = useDebounce(text, 500);

  const dispatch = useDispatch();

  // Load products by default on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubs().then((res) => {
      setSubs(res.data);
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
    if (text) {
      fetchProducts({ query: text });
    }
  }, [textDebounce]);

  const sliderChange = (value) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");
    setPrice(value);
  };

  // Show categories as a list of checkboxes
  useDidMountEffect(() => {
    if (JSON.stringify(price) !== JSON.stringify([0, 0])) {
      fetchProducts({ price });
    }
  }, [priceDebounce]);

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
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setBrand("");
    setColor("");
    setShipping("");

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
    if (categoryIds.length > 0) {
      fetchProducts({ category: categoryIds });
    }
  }, [JSON.stringify(categoryIds)]);

  // Show products by star rating
  const handleStarClick = (num) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");

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

  // Show all sub tags
  const showSubs = () => {
    return subs.map((s) => (
      <div
        onClick={() => handleSub(s)}
        key={s._id}
        className="p-2 m-1 badge bg-info"
        style={{ cursor: "pointer" }}>
        {s.name}
      </div>
    ));
  };

  const handleSub = (sub) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // Show product base on brand name
  const handleBrand = (e) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () => {
    return brands.map((b) => (
      <div key={b}>
        <Radio
          className="pb-1 pt-1"
          value={b}
          checked={brand === b}
          onChange={handleBrand}>
          {b}
        </Radio>
      </div>
    ));
  };

  // Show product base on color
  const handleColor = (e) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setShipping("");

    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () => {
    return colors.map((c) => (
      <div key={c}>
        <Radio
          className="pb-1 pt-1"
          value={c}
          checked={color === c}
          onChange={handleColor}>
          {c}
        </Radio>
      </div>
    ));
  };

  // Show product base on shipping
  const handleShipping = (e) => {
    dispatch({
      type: actionTypes.SEARCH_QUERY,
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setColor("");

    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const showShippings = () => {
    return shippings.map((s) => (
      <Radio
        key={s}
        className="pb-2 pt-2 pe-4"
        value={s}
        checked={shipping === s}
        onChange={handleShipping}>
        {s}
      </Radio>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline">
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
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <TagsOutlined className="me-2" />
                  Sub Categories
                </span>
              }>
              <div className="ps-4 pe-4">{showSubs()}</div>
            </SubMenu>

            {/* Brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <AimOutlined className="me-2" />
                  Brands
                </span>
              }>
              <div className="ps-4 pe-4">{showBrands()}</div>
            </SubMenu>

            {/* Colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined className="me-2" />
                  Colors
                </span>
              }>
              <div className="ps-4 pe-4">{showColors()}</div>
            </SubMenu>

            {/* Colors */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <ThunderboltOutlined className="me-2" />
                  Shipping
                </span>
              }>
              <div className="ps-4 pe-4">{showShippings()}</div>
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
