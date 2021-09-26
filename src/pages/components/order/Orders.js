import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { ORDER_STATUS } from "../../../config/constant";

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <p className="m-0">Delivery Status</p>
              </div>
              <div className="col-md-8">
                <select
                  className="form-select"
                  defaultValue={order.orderStatus}
                  name="status"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }>
                  {ORDER_STATUS.map((status) => (
                    <option key={status} value={status}>
                      {" "}
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
