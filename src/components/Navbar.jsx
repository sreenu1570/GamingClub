import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../storage";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎮 GamingClub
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard">Games</Link>
            <Link to="/users">User Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}