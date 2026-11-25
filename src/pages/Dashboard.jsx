import { Link } from "react-router-dom";
import { getCurrentUser } from "../storage";

export default function Dashboard() {
  const user = getCurrentUser();

  const games = [
    {
      name: "Tic Tac Toe",
      icon: "❌",
      description: "Challenge your friend",
      path: "/tictactoe",
    },
    {
      name: "Rock Paper Scissors",
      icon: "✊",
      description: "Play against the computer",
      path: "/rockpaper",
    },
    {
      name: "Guess the Number",
      icon: "🔢",
      description: "Test your guessing skills",
      path: "/guess",
    },
    {
      name: "Snake Game",
      icon: "🐍",
      description: "Beat your high score",
      path: "/snake",
    },
  ];

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}! 🎮</h1>

      <p>Select your favourite game</p>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.path}>
            <div className="game-icon">{game.icon}</div>

            <h2>{game.name}</h2>

            <p>{game.description}</p>

            <Link className="btn" to={game.path}>
              Play Now
            </Link>
          </div>
        ))}
      </div>

      <Link className="btn" to="/users">
        🏆 View User Dashboard
      </Link>
    </div>
  );
}