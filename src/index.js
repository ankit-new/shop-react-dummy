import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Navbar, Footer } from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import TopProducts from "./components/TopProducts";
import AllProducts from "./components/AllProduct";
import EditProduct from "./pages/EditProduct";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import Cart from "./components/cart";
import Login from "./pages/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { login, logout } from "./features/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";
import { auth } from "./Auth/firebase";
import { loadCartForUser } from "./features/cartSlice"; 

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, " logged");
        dispatch(login(user.email));

        
        localStorage.setItem("uid", user.uid);
        dispatch(loadCartForUser(user.uid)); 
      } else {
        console.log("No user logged in");
        dispatch(logout());
        localStorage.removeItem("uid"); 
      }
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout()); 
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <BrowserRouter>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<TopProducts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
