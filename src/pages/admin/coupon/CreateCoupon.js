import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import DatePicker from "react-datepicker";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/coupon";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getAllCoupons();
  }, []);

  const getAllCoupons = () => {
    getCoupons().then((res) => {
      setCoupons(res.data);
    });
  };

  // Create coupon
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} is created`);
        getAllCoupons();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  // Remove coupon
  const handleRemove = (couponId) => {
    setLoading(true);
    removeCoupon(couponId, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        getAllCoupons();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const onDateChange = (value) => {
    setExpiry(value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={onNameChange}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="number"
                className="form-control"
                onChange={onDiscountChange}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={onDateChange}
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString("vi-VI")}</td>
                  <td>{c.discount}</td>
                  <td>
                    <Popconfirm
                      title="Delete?"
                      onConfirm={() => handleRemove(c._id)}>
                      <DeleteOutlined className="text-danger" />
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
