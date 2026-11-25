import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { saveScore, getUsers, getCurrentUser } from "../storage";

const SIZE = 20;
const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]];

function createFood(snake) {
  const emptyCells = [];

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (!snake.some(([sx, sy]) => sx === x && sy === y)) {
        emptyCells.push([x, y]);
      }
    }
  }

  return emptyCells.length
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null;
}

function initialGame() {
  return {
    snake: INITIAL_SNAKE,
    food: createFood(INITIAL_SNAKE),
    score: 0,
    status: "ready",
  };
}

export default function SnakeGame() {
  const [game, setGame] = useState(initialGame);

  const direction = useRef([1, 0]);
  const nextDirection = useRef([1, 0]);

  const user = getCurrentUser();

  const [best, setBest] = useState(
    () =>
      getUsers().find((u) => u.email === user?.email)
        ?.scores?.snake || 0
  );

  function changeDirection(x, y) {
    const [dx, dy] = direction.current;

    if (x === -dx && y === -dy) return;

    nextDirection.current = [x, y];
  }

  function startGame() {
    direction.current = [1, 0];
    nextDirection.current = [1, 0];

    setGame({
      ...initialGame(),
      status: "playing",
    });
  }

  useEffect(() => {
    function handleKey(e) {
      const keys = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };

      if (keys[e.key]) {
        e.preventDefault();

        const [x, y] = keys[e.key];
        const [dx, dy] = direction.current;

        if (x !== -dx || y !== -dy) {
          nextDirection.current = [x, y];
        }
      }
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (game.status !== "playing") return;

    const timer = setInterval(() => {
      direction.current = nextDirection.current;

      const [dx, dy] = direction.current;

      setGame((previous) => {
        if (previous.status !== "playing") return previous;

        const head = [
          previous.snake[0][0] + dx,
          previous.snake[0][1] + dy,
        ];

        const eatsFood =
          head[0] === previous.food[0] &&
          head[1] === previous.food[1];

        const body = eatsFood
          ? previous.snake
          : previous.snake.slice(0, -1);

        const hitWall =
          head[0] < 0 ||
          head[0] >= SIZE ||
          head[1] < 0 ||
          head[1] >= SIZE;

        const hitBody = body.some(
          ([x, y]) => x === head[0] && y === head[1]
        );

        if (hitWall || hitBody) {
          return {
            ...previous,
            status: "over",
          };
        }

        const newSnake = [head, ...body];

        const food = eatsFood
          ? createFood(newSnake)
          : previous.food;

        return {
          snake: newSnake,
          food,
          score: previous.score + (eatsFood ? 10 : 0),
          status: food ? "playing" : "won",
        };
      });
    }, 150);

    return () => clearInterval(timer);
  }, [game.status]);

  useEffect(() => {
    if (game.score > 0) {
      saveScore("snake", game.score);
      setBest((previous) => Math.max(previous, game.score));
    }
  }, [game.score]);

  return (
    <div className="game-page">
      <h1>🐍 Snake Game</h1>

      <div className="score-box">
        <h3>Score: {game.score}</h3>
        <h3>High Score: {best}</h3>
      </div>

      <div className="snake-board">
        {Array.from({ length: SIZE * SIZE }, (_, index) => {
          const x = index % SIZE;
          const y = Math.floor(index / SIZE);

          const isSnake = game.snake.some(
            ([sx, sy]) => sx === x && sy === y
          );

          const isFood =
            game.food &&
            game.food[0] === x &&
            game.food[1] === y;

          return (
            <div
              key={index}
              className={
                isSnake
                  ? "snake-cell snake"
                  : isFood
                  ? "snake-cell food"
                  : "snake-cell"
              }
            />
          );
        })}
      </div>

      {game.status === "over" && <h2>Game Over!</h2>}
      {game.status === "won" && <h2>You Won!</h2>}

      <p>Use your keyboard arrow keys to move.</p>

      <div className="snake-controls">
        <button onClick={() => changeDirection(0, -1)}>
          ↑
        </button>

        <div className="button-group">
          <button onClick={() => changeDirection(-1, 0)}>
            ←
          </button>

          <button onClick={() => changeDirection(0, 1)}>
            ↓
          </button>

          <button onClick={() => changeDirection(1, 0)}>
            →
          </button>
        </div>
      </div>

      <div className="button-group">
        <button onClick={startGame}>
          {game.status === "ready" ? "Start Game" : "Restart"}
        </button>

        <Link className="btn" to="/users">
          Leaderboard
        </Link>

        <Link className="btn" to="/dashboard">
          Back
        </Link>
      </div>
    </div>
  );
}