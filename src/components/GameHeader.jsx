const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const streakLabel = (n) => {
  if (n >= 30) return "👑";
  if (n >= 14) return "🔥";
  if (n >= 7)  return "⚡";
  if (n >= 3)  return "✨";
  return "🌱";
};

export const GameHeader = ({
  score, moves, elapsedTime, onReset,
  currentUser, streak, view, setView,
  onSettingsOpen, onLogout,
}) => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__brand">
          <span className="header__logo">🌍</span>
          <div>
            <h1 className="header__title">Africa Match</h1>
            <p className="header__subtitle">Memory Card Game</p>
          </div>
        </div>

        <div className="header__actions">
          {/* Streak badge */}
          {streak > 0 && (
            <div className="streak-badge" title={`${streak}-day win streak`}>
              <span className="streak-badge__icon">{streakLabel(streak)}</span>
              <span className="streak-badge__count">{streak}</span>
            </div>
          )}

          {/* User info */}
          <div className="user-pill">
            <span className="user-pill__avatar">
              {currentUser?.username?.[0]?.toUpperCase() || "?"}
            </span>
            <span className="user-pill__name">{currentUser?.username || "Guest"}</span>
          </div>

          <button className="icon-btn" onClick={onSettingsOpen} title="Settings">⚙️</button>
          <button className="icon-btn icon-btn--logout" onClick={onLogout} title="Sign out">↩</button>
        </div>
      </div>

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
          <div className="stat-card">
            <span className="stat-card__label">Streak</span>
            <span className="stat-card__value streak-stat">
              {streak > 0 ? `${streakLabel(streak)} ${streak}d` : "—"}
            </span>
          </div>
          <button className="reset-btn" onClick={onReset}>New Game</button>
        </div>
      )}
    </header>
  );
};
