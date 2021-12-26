const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const { pageNotFound, handleErrors } = require("./helper/handelErrors");

//app
const app = express();

//router
const auth = require("./route/auth");
const user = require("./route/user");
const category = require("./route/category");
const product = require("./route/product");
const braintree = require("./route/braintree");
const order = require("./route/order");

//db
require("./db/index");

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//router middleware
app.use("/api", auth);
app.use("/api", user);
app.use("/api", category);
app.use("/api", product);
app.use("/api", braintree);
app.use("/api", order);

//page Not Found
app.use(pageNotFound);

// error handler middleware
app.use(handleErrors);

//server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
