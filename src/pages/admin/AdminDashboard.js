import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../components/nav/AdminNav";
import { changeStatus, getOrders } from "../../functions/admin";
import { toast } from "react-toastify";
import Orders from "../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    console.log("status", orderStatus);
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
