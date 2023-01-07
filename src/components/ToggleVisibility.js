import { useState } from "react";

const ToggleVisibility = ({ children }) => {
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  const buttonText = show ? "Hide App" : "Show App";

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded show-button"
        onClick={toggleShow}
      >
        {buttonText}
      </button>
      {show && children}
    </>
  );
};

export default ToggleVisibility;
