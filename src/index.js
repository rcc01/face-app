import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "tachyons";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogoDetection from "./components/LogoDetection";
import Reload from "./components/Reload";
import Location from "./components/Location";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/logo",
        element: <LogoDetection />,
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
