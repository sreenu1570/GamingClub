import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";

import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import GuessNumber from "./games/GuessNumber";
import SnakeGame from "./games/SnakeGame";

import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/rockpaper" element={<RockPaperScissors />} />
          <Route path="/guess" element={<GuessNumber />} />
          <Route path="/snake" element={<SnakeGame />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}