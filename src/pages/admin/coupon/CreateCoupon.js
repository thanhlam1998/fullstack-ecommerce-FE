import React, { useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import DatePicker from "react-datepicker";
import { createCoupon } from "../../../functions/coupon";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

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
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err)
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
          <h4>Coupon</h4>

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
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
