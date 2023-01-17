import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../index.css";

const Icons = () => {
  const divStyle = {
    background: "rgb(238, 174, 202)",
    backgroundTwo: "rgb(100, 200, 100)",
    backgroundThree: "rgb(100, 240, 300)",
    backgroundFour: "rgb(210, 401, 241)",
  };
  const redBackground = () => {
    document.body.style.background = "none";
    document.body.style.backgroundColor = divStyle.background;
  };

  const greenBackground = () => {
    document.body.style.background = "none";
    document.body.style.backgroundColor = divStyle.backgroundTwo;
  };

  const blueBackground = () => {
    document.body.style.background = "none";
    document.body.style.backgroundColor = divStyle.backgroundThree;
  };

  const backgroundFour = () => {
    document.body.style.background = "none";
    document.body.style.backgroundColor = divStyle.backgroundFour;
  };

  return (
    <Container>
      <ul className="nav" style={{ display: "flex", justifyContent: "center" }}>
        <li>
          <button onClick={greenBackground}>
            <Link to={`/home`}>
              <span className="icon-home"></span>
            </Link>
          </button>
        </li>
        <li>
          <button onClick={redBackground}>
            <Link to={`/logo`}>
              <span className="icon-cog"></span>
              <span className="screen-reader-text">Logo Detection</span>
            </Link>
          </button>
        </li>
        <li>
          <button onClick={blueBackground}>
            <Link to={`/reload`}>
              <span className="icon-cw"></span>
              <span className="screen-reader-text">Refresh</span>
            </Link>
          </button>
        </li>
        <li>
          <button onClick={backgroundFour}>
            <Link to={`/location`}>
              <span className="icon-location"></span>
              <span className="screen-reader-text">Location</span>
            </Link>
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Icons;
