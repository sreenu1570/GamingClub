import { useState } from "react";
import { Link } from "react-router-dom";
import { saveScore } from "../storage";

export default function GuessNumber() {
  const [target, setTarget] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function checkGuess(e) {
    e.preventDefault();

    if (gameOver) return;

    const number = Number(guess);

    if (
      !Number.isInteger(number) ||
      number < 1 ||
      number > 100
    ) {
      setMessage("Enter a number between 1 and 100.");
      return;
    }

    setAttempts((count) => count + 1);

    if (number === target) {
      setMessage("🎉 Correct! You Win!");
      setGameOver(true);
      saveScore("guess", 1);
    } else if (number < target) {
      setMessage("Too Low! Try a higher number.");
    } else {
      setMessage("Too High! Try a lower number.");
    }

    setGuess("");
  }

  function restart() {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setGameOver(false);
  }

  return (
    <div className="game-page">
      <h1>Guess the Number</h1>

      <p>Guess a number between 1 and 100</p>

      <form className="guess-form" onSubmit={checkGuess}>
        <input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          required
          disabled={gameOver}
        />

        <button type="submit" disabled={gameOver}>
          Guess
        </button>
      </form>

      <h2>{message}</h2>

      <h3>Attempts: {attempts}</h3>

      <div className="button-group">
        <button onClick={restart}>New Game</button>

        <Link className="btn" to="/dashboard">
          Back
        </Link>
      </div>
    </div>
  );
}