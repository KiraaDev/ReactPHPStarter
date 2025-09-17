import { createBrowserRouter } from "react-router";

import PrivateRoute from "./components/PrivateRoute";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import PublicRoute from "./components/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute restricted>
        <Login />,
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute restricted>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute allowedRoles={["Admin"]}>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
