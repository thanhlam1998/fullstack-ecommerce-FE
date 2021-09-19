import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest}></Route> : <LoadingToRedirect />;
};

export default UserRoute;
