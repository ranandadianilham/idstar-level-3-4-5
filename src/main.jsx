import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/Authentication/SignIn.jsx";
import Register from "./pages/Authentication/SignUp.jsx";
import ForgetPassword from "./pages/Authentication/ForgetPassword.jsx";
import store from "./state/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/signin",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Register />,
  },/* 
  {
    path: "/employee",
    element: <Register />,
  }, */
  {
    path: "/auth/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/auth", // Redirect to /auth/signin if path is exactly "/auth"
    element: <Navigate to="/auth/signin" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
