import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishList, removeWishList } from "../../functions/user";
import UserNav from "../components/nav/UserNav";
import { DeleteOutlined } from "@ant-design/icons";

const History = () => {
  const [wishList, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadWishList = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishList);
    });
  };

  const handleRemove = (productId) => {
    removeWishList(productId, user.token).then((res) => {
      loadWishList();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {wishList.map((p) => (
            <div
              key={p._id}
              className="d-flex w-100 alert alert-primary justify-content-between">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-light btn-sm">
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
