import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCurrentUser } from "./store/slices/authSlice";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Landing from "./sections/Landing";
import Dashboard from "./sections/Dashboard";
import Products from "./sections/Products";
import Categories from "./sections/Categories";
import Orders from "./sections/Orders";
import About from "./sections/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="acerca" element={<About />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;