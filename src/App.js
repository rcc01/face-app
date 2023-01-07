import Navbar from "./components/Navbar";
import Icons from "./components/Icons";
import "./App.css";
import "./input.css";
import { Outlet } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Icons />
      <Outlet />
    </div>
  );
};

export default App;
