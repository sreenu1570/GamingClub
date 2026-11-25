import { Link } from "react-router-dom";
import { getUsers } from "../storage";

export default function UserDashboard() {
  const users = getUsers();

  const leaderboard = [...users].sort(
    (a, b) =>
      (b.scores?.snake || 0) -
      (a.scores?.snake || 0)
  );

  return (
    <div className="dashboard">
      <h1>👥 User Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <h1>{users.length}</h1>
        </div>

        <div className="stat-card">
          <h3>Total Games</h3>
          <h1>4</h1>
        </div>

        <div className="stat-card">
          <h3>Top Snake Score</h3>
          <h1>{leaderboard[0]?.scores?.snake || 0}</h1>
        </div>
      </div>

      <h2>Registered Users</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>XOX Points</th>
              <th>RPS Wins</th>
              <th>Guess Wins</th>
              <th>Snake Best</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.joined}</td>
                <td>{user.scores?.tictactoe || 0}</td>
                <td>{user.scores?.rockpaper || 0}</td>
                <td>{user.scores?.guess || 0}</td>
                <td>{user.scores?.snake || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>🏆 Snake Leaderboard</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>High Score</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.scores?.snake || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link className="btn" to="/dashboard">
        Back to Games
      </Link>
    </div>
  );
}