import { useState, useRef, useEffect } from "react";
import { AuthPanel } from "./AuthPanel";

const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const streakIcon = (n) => {
  if (n >= 30) return "👑";
  if (n >= 14) return "🔥";
  if (n >= 7)  return "⚡";
  if (n >= 3)  return "✨";
  return "🌱";
};

export const GameHeader = ({
  score, moves, elapsedTime, onReset,
  currentUser, streak, view, setView,
  onSettingsOpen, onLogin, onLogout,
}) => {
  const [showAuth, setShowAuth] = useState(false);
  const authRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    if (!showAuth) return;
    const handler = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) {
        setShowAuth(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showAuth]);

  return (
    <header className="header">
      <div className="header__top">
        {/* Brand */}
        <div className="header__brand">
          <span className="header__logo">🌍</span>
          <div>
            <h1 className="header__title">Africa Match</h1>
            <p className="header__subtitle">Memory Card Game</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="header__actions">
          {/* Streak badge — only when logged in and streak > 0 */}
          {currentUser && streak > 0 && (
            <div className="streak-badge" title={`${streak}-day win streak`}>
              <span>{streakIcon(streak)}</span>
              <span className="streak-badge__count">{streak}d</span>
            </div>
          )}

          {/* Settings */}
          <button className="icon-btn" onClick={onSettingsOpen} title="Settings">⚙️</button>

          {/* Auth area */}
          <div className="auth-area" ref={authRef}>
            {currentUser ? (
              /* Logged-in: user pill + logout */
              <div className="user-pill">
                <span className="user-pill__avatar">
                  {currentUser.username[0].toUpperCase()}
                </span>
                <span className="user-pill__name">{currentUser.username}</span>
                <button
                  className="user-pill__logout"
                  onClick={onLogout}
                  title="Sign out"
                >
                  ↩
                </button>
              </div>
            ) : (
              /* Guest: Sign In button that opens inline panel */
              <button
                className="signin-btn"
                onClick={() => setShowAuth((v) => !v)}
              >
                Sign In
              </button>
            )}

            {/* Inline auth dropdown (only when not logged in) */}
            {!currentUser && showAuth && (
              <AuthPanel
                onSuccess={(user) => {
                  onLogin(user);
                  setShowAuth(false);
                }}
                onClose={() => setShowAuth(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <nav className="header__nav">
        <button
          className={`nav-tab ${view === "game" ? "nav-tab--active" : ""}`}
          onClick={() => setView("game")}
        >
          Game
        </button>
        <button
          className={`nav-tab ${view === "leaderboard" ? "nav-tab--active" : ""}`}
          onClick={() => setView("leaderboard")}
        >
          Leaderboard
        </button>
      </nav>

      {/* Stats bar — visible in game view */}
      {view === "game" && (
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-card__label">Score</span>
            <span className="stat-card__value">{score}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Moves</span>
            <span className="stat-card__value">{moves}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Time</span>
            <span className="stat-card__value">{formatTime(elapsedTime)}</span>
          </div>
          {currentUser && (
            <div className="stat-card">
              <span className="stat-card__label">Streak</span>
              <span className="stat-card__value streak-stat">
                {streak > 0 ? `${streakIcon(streak)} ${streak}d` : "—"}
              </span>
            </div>
          )}
          <button className="reset-btn" onClick={onReset}>New Game</button>
        </div>
      )}
    </header>
  );
};