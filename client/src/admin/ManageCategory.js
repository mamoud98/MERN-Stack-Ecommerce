import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const { token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        setCategories(res.data);
      }
    });
  };

  const destroy = (CategoryId) => {
    deleteCategory(token, CategoryId).then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title="Manage categories"
      description="Perform CRUD on categories"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {categories.length} category</h2>
          <hr />
          <ul className="list-group">
            {categories.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/category/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategory;
