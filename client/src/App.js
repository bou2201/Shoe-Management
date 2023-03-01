import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ErrorPage,
  Loading,
  Login,
  Register,
  Layout,
  Dashboard,
  Product,
  Details,
  Order,
  History,
  Cart,
  Create,
  Delete,
  Update,
} from "./components";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading && <Loading />}

      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<Details />} />
              <Route path="product/create" element={<Create />} />
              <Route path="product/update/:id" element={<Update />} />
              <Route path="product/delete/:id" element={<Delete />} />
              <Route path="orders" element={<Order />} />
              <Route path="history" element={<History />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
