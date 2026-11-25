import { Link } from "react-router-dom";
import { getCurrentUser } from "../storage";

export default function Home() {
  const user = getCurrentUser();

  return (
    <div className="hero">
      <h1>🎮 Welcome to GamingClub</h1>

      <p>Play. Compete. Beat your high score.</p>

      <p>
        Enjoy four exciting games and challenge yourself!
      </p>

      <div className="button-group">
        {user ? (
          <Link className="btn" to="/dashboard">
            Play Games
          </Link>
        ) : (
          <>
            <Link className="btn" to="/signup">
              Get Started
            </Link>

            <Link className="btn" to="/login">
              Login
            </Link>
          </>
        )}
      </div>

      <div className="hero-icons">
        ❌ ✊ 🔢 🐍
      </div>
    </div>
  );
}