import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/dashboard" style={{ color: "white", marginRight: "10px" }}>
        Dashboard
      </Link>
      <Link to="/" style={{ color: "white" }}>
        Logout
      </Link>
    </nav>
  );
}
