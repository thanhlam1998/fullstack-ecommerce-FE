import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { currentAdmin } from "../../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest}></Route> : <LoadingToRedirect />;
};

export default AdminRoute;
