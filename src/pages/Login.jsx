import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [expiry, setExpiry] = useState(0);
  const [resetEmail, setResetEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // User Login
  function handleLogin(e) {
    e.preventDefault();

    const users = getUsers();

    const user = users.find(
      (u) =>
        u.email === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!user) {
      setMessage("Invalid email or password!");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    navigate("/dashboard");
  }

  // Generate Temporary OTP
  function generateOtp(e) {
    e.preventDefault();

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    const user = users.find(
      (u) => u.email === cleanEmail
    );

    if (!user) {
      setMessage("Email is not registered!");
      return;
    }

    const temporaryOtp = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setOtp(temporaryOtp);
    setEnteredOtp("");
    setResetEmail(cleanEmail);

    // OTP expires after 2 minutes
    setExpiry(Date.now() + 120000);

    setMessage("");
    setStep("verify");

    alert("Your temporary OTP is: " + temporaryOtp);
  }

  // Verify OTP
  function verifyOtp(e) {
    e.preventDefault();

    if (Date.now() >= expiry) {
      setMessage("OTP expired. Please generate a new OTP.");
      return;
    }

    if (!otp || enteredOtp.trim() !== otp) {
      setMessage("Invalid OTP. Please try again.");
      return;
    }

    setOtp("");
    setEnteredOtp("");
    setMessage("");
    setStep("reset");
  }

  // Reset Password
  function resetPassword(e) {
    e.preventDefault();

    if (Date.now() >= expiry) {
      setMessage("Reset session expired. Generate a new OTP.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const users = getUsers();

    const updatedUsers = users.map((user) =>
      user.email === resetEmail
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setResetEmail("");
    setOtp("");
    setExpiry(0);
    setMessage("");
    setStep("login");

    alert("Password reset successfully!");
  }

  function changeStep(nextStep) {
    setMessage("");
    setStep(nextStep);
    setOtp("");
    setEnteredOtp("");
    setExpiry(0);
    setResetEmail("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="auth-container">

      {/* Login Form */}

      {step === "login" && (
        <form className="auth-card" onSubmit={handleLogin}>

          <h2>🎮 Player Login</h2>

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
            required
          />

          <button type="submit">Login</button>

          <p>
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                changeStep("forgot");
              }}
            >
              Forgot Password?
            </a>
          </p>

          <p className="message">{message}</p>

          <p>
            New user? <Link to="/signup">Signup</Link>
          </p>

        </form>
      )}

      {/* Forgot Password Form */}

      {step === "forgot" && (
        <form className="auth-card" onSubmit={generateOtp}>

          <h2>🔑 Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Generate OTP</button>

          <p className="message">{message}</p>

          <p>
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                changeStep("login");
              }}
            >
              Back to Login
            </a>
          </p>

        </form>
      )}

      {/* OTP Verification Form */}

      {step === "verify" && (
        <form className="auth-card" onSubmit={verifyOtp}>

          <h2>🔐 Verify OTP</h2>

          <p>Enter your temporary 6-digit OTP.</p>

          <p>OTP is valid for 2 minutes.</p>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            maxLength={6}
            pattern="[0-9]{6}"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            required
          />

          <button type="submit">Verify OTP</button>

          <p className="message">{message}</p>

          <p>
            <a
              href="#resend"
              onClick={generateOtp}
            >
              Resend OTP
            </a>
          </p>

          <p>
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                changeStep("login");
              }}
            >
              Back to Login
            </a>
          </p>

        </form>
      )}

      {/* Reset Password Form */}

      {step === "reset" && (
        <form className="auth-card" onSubmit={resetPassword}>

          <h2>🔒 Reset Password</h2>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button type="submit">Reset Password</button>

          <p className="message">{message}</p>

          <p>
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                changeStep("forgot");
              }}
            >
              Restart Password Reset
            </a>
          </p>

        </form>
      )}

    </div>
  );
}