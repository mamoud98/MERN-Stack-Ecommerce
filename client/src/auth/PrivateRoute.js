import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ children, path }) =>
  isAuthenticated() ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );

export default PrivateRoute;
