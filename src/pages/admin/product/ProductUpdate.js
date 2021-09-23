import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getProduct, updateProduct } from "../../../functions/product";
import FileUpload from "../../components/forms/FileUpload";
import ProductUpdateForm from "../../components/forms/ProductUpdateForm";
import AdminNav from "../../components/nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  // State
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // Router
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });
  };

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // Load single product
      setValues((prev) => ({ ...prev, ...p.data }));
      // Load single product category subs
      getCategorySubs(p.data.category?._id).then((res) => {
        setSubOptions(res.data); // on first load
      });
      // Prepare array of sub ids to show as default sub value in select
      const arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubs((prev) => arr);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory
      ? selectedCategory
      : values.category?._id;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated `);
        history.push("/admin/products");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    // If user clicks back to the original category
    // show its sub categories default
    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubs([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h3" />
          ) : (
            <h4>Product update</h4>
          )}
          <hr />

          <div className="pt-3 pb-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
