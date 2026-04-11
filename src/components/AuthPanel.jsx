import { useState } from "react";
import { login, register } from "../services/auth";

export const AuthPanel = ({ onSuccess, onClose }) => {
  const [mode, setMode] = useState("login");
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
      onClose();
    }
  };

  return (
    <div className="auth-panel" role="dialog" aria-label="Sign in or register">
      <div className="auth-panel__header">
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
            Register
          </button>
        </div>
        <button className="auth-panel__close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="auth-panel__form">
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          maxLength={20}
          autoFocus
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "register" ? "Password (min 4 chars)" : "Password"}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
};