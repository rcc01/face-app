import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "tachyons";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Settings from "./components/Settings";
import Reload from "./components/Reload";
import Location from "./components/Location";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/reload",
        element: <Reload />,
      },
      {
        path: "/location",
        element: <Location />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
