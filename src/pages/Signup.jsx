import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../storage";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email === cleanEmail
    );

    if (existingUser) {
      setMessage("Email already registered!");
      return;
    }

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password,
      joined: new Date().toLocaleDateString(),
      scores: {
        tictactoe: 0,
        rockpaper: 0,
        guess: 0,
        snake: 0,
      },
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration successful!");
    navigate("/login");
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Signup</button>

        <p className="message">{message}</p>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}