import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children, path }) =>
  isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );

export default AdminRoute;
