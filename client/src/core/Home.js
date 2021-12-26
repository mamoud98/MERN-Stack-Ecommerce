import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Search from "./Search";
import Card from "./Card";
import { getProducts } from "./apiCore";

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold")
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductsBySell(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data.data);
      }
    });
  };
  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);
  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <Search />
      <div className="container">
      <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-md-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-md-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
