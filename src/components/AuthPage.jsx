import { useState } from "react";
import { login, register } from "../services/auth";
import { Gamepad2, Trophy } from "lucide-react";
import { Gamepad } from "lucide-react";

export const AuthPage = ({ onSuccess, onBack }) => {
  const [mode, setMode]         = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = mode === "login"
      ? login(username, password)
      : register(username, password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    onSuccess();
  };

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        {}
        <button className="auth-page__back" onClick={onBack}>
          ← Back to game
        </button>

        {}
        <div className="auth-page__brand">
          <span className="auth-page__logo"><Gamepad2 /></span>
          <h1 className="auth-page__title">Memory Matching Game</h1>
          <p className="auth-page__sub">Match cards have fun!</p>
        </div>

        {}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "register" ? "auth-tab--active" : ""}`}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-page__form">
          <div className="form-group">
            <label className="form-label" htmlFor="ap-username">Username</label>
            <input
              id="ap-username"
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={mode === "register" ? "Choose a username" : "Your username"}
              maxLength={20}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ap-password">Password</label>
            <input
              id="ap-password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "register" ? "Min 4 characters" : "Your password"}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary auth-page__submit"
            disabled={loading}
          >
            {loading
              ? "Please wait…"
              : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-page__hint">
          {mode === "login" ? "New here? " : "Already have an account? "}
          <button
            type="button"
            className="auth-link"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </p>

        <p className="auth-page__benefit">
          <Trophy />Sign in to save scores, track streaks &amp; appear on the leaderboard
        </p>
      </div>
    </div>
  );
};