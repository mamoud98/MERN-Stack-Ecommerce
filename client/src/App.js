import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Error from "./Error";
import Product from "./core/Product";
import Shop from "./core/Shop";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import ManageCategory from "./admin/ManageCategory";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/shop">
        <Shop />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/product/:productId">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      {/* /// */}
      <AdminRoute path="/admin/dashboard">
        <AdminDashboard />
      </AdminRoute>
      <AdminRoute path="/admin/orders">
        <Orders />
      </AdminRoute>
      <AdminRoute path="/create/category">
        <AddCategory />
      </AdminRoute>
      <AdminRoute path="/create/product">
        <AddProduct />
      </AdminRoute>
      <AdminRoute path="/admin/products">
        <ManageProducts />
      </AdminRoute>
      <AdminRoute path="/admin/Categories">
        <ManageCategory />
      </AdminRoute>
      <AdminRoute path="/admin/product/update/:productId">
        <UpdateProduct />
      </AdminRoute>
      <AdminRoute path="/admin/category/update/:CategoryId">
        <UpdateCategory />
      </AdminRoute>
      {/* /// */}

      {/* /// */}
      <PrivateRoute path="/user/dashboard">
        <UserDashboard />
      </PrivateRoute>
      <PrivateRoute path="/profile/:UserId">
        <Profile />
      </PrivateRoute>


      Profile
      {/* /// */}
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
}

export default App;
