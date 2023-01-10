import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Icons = () => {
  return (
    <Container>
      <ul className="nav" style={{ display: "flex", justifyContent: "center" }}>
        <li>
          <Link to={`/`}>
            <span className="icon-home"></span>
            <span className="screen-reader-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to={`/logo`}>
            <span className="icon-cog"></span>
            <span className="screen-reader-text">Logo Detection</span>
          </Link>
        </li>
        <li>
          <Link to={`/reload`}>
            <span className="icon-cw"></span>
            <span className="screen-reader-text">Refresh</span>
          </Link>
        </li>
        <li>
          <Link to={`/location`}>
            <span className="icon-location"></span>
            <span className="screen-reader-text">Location</span>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Icons;
