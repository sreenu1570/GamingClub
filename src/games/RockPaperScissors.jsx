import { useState } from "react";
import { Link } from "react-router-dom";
import { saveScore } from "../storage";

export default function RockPaperScissors() {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = ["Rock", "Paper", "Scissors"];

  function play(choice) {
    const computerChoice =
      choices[Math.floor(Math.random() * 3)];

    setPlayer(choice);
    setComputer(computerChoice);

    if (choice === computerChoice) {
      setResult("It's a Draw!");
    } else if (
      (choice === "Rock" &&
        computerChoice === "Scissors") ||
      (choice === "Paper" &&
        computerChoice === "Rock") ||
      (choice === "Scissors" &&
        computerChoice === "Paper")
    ) {
      setResult("You Win!");
      setPlayerScore((score) => score + 1);
      saveScore("rockpaper", 1);
    } else {
      setResult("Computer Wins!");
      setComputerScore((score) => score + 1);
    }
  }

  function reset() {
    setPlayer("");
    setComputer("");
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
  }

  return (
    <div className="game-page">
      <h1>Rock Paper Scissors</h1>

      <div className="score-box">
        <h3>Your Score: {playerScore}</h3>
        <h3>Computer Score: {computerScore}</h3>
      </div>

      <div className="button-group">
        <button onClick={() => play("Rock")}>
          ✊ Rock
        </button>

        <button onClick={() => play("Paper")}>
          ✋ Paper
        </button>

        <button onClick={() => play("Scissors")}>
          ✌️ Scissors
        </button>
      </div>

      <h3>You: {player || "-"}</h3>
      <h3>Computer: {computer || "-"}</h3>

      <h2>{result}</h2>

      <div className="button-group">
        <button onClick={reset}>Reset Game</button>

        <Link className="btn" to="/dashboard">
          Back
        </Link>
      </div>
    </div>
  );
}