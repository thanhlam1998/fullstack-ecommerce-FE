import { Card, Drawer } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionTypes } from "../../../actions/types";
import laptop from "../../../images/laptop.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  const handleClose = () => {
    dispatch({
      type: actionTypes.SET_VISIBLE,
      payload: false,
    });
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Products`}
      placement="right"
      onClose={handleClose}
      width={300}
      visible={drawer}>
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            <Card
              className="mb-3"
              bodyStyle={{
                padding: "1em",
                backgroundColor: "#4D4D4D",
              }}
              cover={
                <img
                  src={p.images[0] ? p.images[0].url : laptop}
                  alt="product_image"
                  style={imageStyle}
                  className="p-1"
                />
              }>
              <Meta
                title={
                  <div className="text-white">
                    {p.title} x {p.count}
                  </div>
                }
              />
            </Card>
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button
          onClick={handleClose}
          className="btn btn-info btn-=raised btn-block">
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
