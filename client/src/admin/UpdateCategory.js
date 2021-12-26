import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getCategory, updateCategory } from "./apiAdmin";
import { useParams } from "react-router-dom";

const UpdateCategory = ({ match }) => {
  const { CategoryId } = useParams();

  const [values, setValues] = useState({
    name: "",
    error: "",
    redirectToProfile: false,
    // formData: ''
  });

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const { name, error, redirectToProfile } = values;

  const init = (categoryId) => {
    getCategory(token, categoryId).then((res) => {
      if (res.data.error) {
        setValues({ ...values, error: res.data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: res.data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(CategoryId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitCategoryForm = (e) => {
    e.preventDefault();
    // update with ? you should send category name otherwise what to update?
    const category = {
      name: name,
    };
    updateCategory(token, CategoryId, category).then((res) => {
      if (res.data.error) {
        setValues({ ...values, error: res.data.error });
      } else {
        setValues({
          ...values,
          name: res.data.name,
          error: false,
          redirectToProfile: true,
        });
      }
    });
  };

  const updateCategoryForm = () => (
    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
      <form className="mb-5" onSubmit={submitCategoryForm}>
        <span className="login100-form-title p-b-32 m-b-7">
          Update Category Form
        </span>
        <span className="txt1 p-b-11">Category Name</span>
        <br />
        <br />
        <div className=" form-group ">
          <input
            onChange={handleChange("name")}
            value={name}
            className="form-control"
            type="text"
            required
            name="name"
          />
        </div>
        <div className="w-size25">
          <button type="submit" className="btn btn-outline-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  const showError = () => (
    <div
      className={"alert alert-danger"}
      role="alert"
      style={{ display: error ? "" : "none" }}
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/categories" />;
      }
    }
  };

  const goBackBTN = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/categories" className="text-info">
          Back To Admin Home
        </Link>
      </div>
    );
  };

  return (
    <Layout
      title={`Hi ${user.name}`}
      description={`This is Update Category Action Page`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 m-b-250 mb-5">
          {showError()}
          {updateCategoryForm()}
          {goBackBTN()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
