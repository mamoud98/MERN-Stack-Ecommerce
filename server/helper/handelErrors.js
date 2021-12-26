const handleDbErrors = (messageIncluded, err) => {
  console.log(err.message, err.code);
  // let errors = { email: "", password: "" };
  let errors = {};

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // forget  password
  if (err.message === "data and hash arguments required") {
    errors.password = "Please enter your password";
  }

  // forget  photo
  if (err.message === "Cannot read property 'buffer' of undefined") {
    errors.photo = "Please enter your product photo";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors

  if (err.message.includes(messageIncluded)) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const pageNotFound = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};
const handleErrors = (error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
};
module.exports = {
  handleDbErrors,
  handleErrors,
  pageNotFound,
};
