import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/contact"}>Contact</Link>
      <Link to={"/example"}>Example</Link>
      <Link to={"/artikel"}>Artikel</Link>
    </div>
  );
};

export default Navbar;
