import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../../actions/types";
const FloatingButton = () => {
  const dispatch = useDispatch();
  const { drawer } = useSelector((state) => ({ ...state }));

  const handleClick = () => {
    dispatch({
      type: actionTypes.SET_VISIBLE,
      payload: !drawer,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="fixed-action-btn"
      style={{ right: 10, bottom: 10 }}>
      <div className="btn btn-floating btn-danger btn-lg">
        <i className="fas fa-shopping-cart"></i>
      </div>
    </div>
  );
};

export default FloatingButton;
