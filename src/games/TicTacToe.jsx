import { useState } from "react";
import { Link } from "react-router-dom";
import { saveScore } from "../storage";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isX, setIsX] = useState(true);
  const [result, setResult] = useState("");

  function checkWinner(cells) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of combinations) {
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a];
      }
    }

    return null;
  }

  function handleClick(index) {
    if (board[index] || result) return;

    const newBoard = [...board];

    newBoard[index] = isX ? "X" : "O";

    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner) {
      setResult(`Player ${winner} Wins!`);

      if (winner === "X") {
        saveScore("tictactoe", 1);
      }
    } else if (newBoard.every(Boolean)) {
      setResult("Match Draw!");
    } else {
      setIsX(!isX);
    }
  }

  function restart() {
    setBoard(Array(9).fill(""));
    setIsX(true);
    setResult("");
  }

  return (
    <div className="game-page">
      <h1>Tic Tac Toe</h1>

      <p>You are Player X.</p>

      <h2>
        {result || `Player ${isX ? "X" : "O"} Turn`}
      </h2>

      <div className="xox-board">
        {board.map((cell, index) => (
          <button
            className={`cell ${cell}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="button-group">
        <button onClick={restart}>Restart Game</button>

        <Link className="btn" to="/dashboard">
          Back
        </Link>
      </div>
    </div>
  );
}