import { useState } from "react";
import { login, register } from "../services/auth";

export const AuthModal = ({ onSuccess }) => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = mode === "login"
      ? login(username, password)
      : register(username, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      onSuccess(result.user);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Sign in">
      <div className="modal auth-modal">
        <div className="auth-modal__brand">
          <span className="auth-modal__logo">🌍</span>
          <h1 className="auth-modal__title">Africa Match</h1>
          <p className="auth-modal__sub">Memory Card Game</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${mode === "register" ? "auth-tab--active" : ""}`}
            onClick={() => { setMode("register"); setError(""); }}
            type="button"
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label className="form-label" htmlFor="auth-username">Username</label>
            <input
              id="auth-username"
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
            <label className="form-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "register" ? "Choose a password (min 4 chars)" : "Your password"}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
            style={{ marginTop: "4px" }}
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-hint">
          {mode === "login"
            ? "New here? "
            : "Already have an account? "}
          <button
            type="button"
            className="auth-link"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};