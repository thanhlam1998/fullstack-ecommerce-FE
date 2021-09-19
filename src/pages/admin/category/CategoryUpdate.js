import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../components/forms/CategoryForm";
import AdminNav from "../../components/nav/AdminNav";

const CategoryUpdate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const loadCategory = useCallback(() => {
    getCategory(slug).then((c) => {
      setName(c.data.name);
    });
  }, [slug]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
