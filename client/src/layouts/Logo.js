import logoDark from "../assets/images/logos/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logoDark}
        alt="Logo"
        style={{ maxWidth: "175px", height: "auto" }}
      />{" "}
    </Link>
  );
};

export default Logo;
