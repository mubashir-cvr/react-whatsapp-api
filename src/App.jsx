
import "./App.css";
import React from "react";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import { DASHBOARD_SIDEBAR,DASHBOARD_SIDEBAR_SEC } from "./routes/nav";
import { createHashRouter, RouterProvider } from "react-router-dom";
function App() {
  const routes = DASHBOARD_SIDEBAR.concat(DASHBOARD_SIDEBAR_SEC);
  const routAndElement = routes.map((route) => ({
    path: route.to || "/",
    element: route.element || <div></div>,
  }));
  const router = createHashRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: routAndElement,
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
