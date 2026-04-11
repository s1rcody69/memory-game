const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

export const WinModal = ({ moves, score, elapsedTime, difficulty, streak, onPlayAgain, onViewLeaderboard }) => {
  const isStreakMilestone = streak > 0 && [3, 7, 14, 30].includes(streak);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal win-modal">
        <div className="win-modal__confetti" aria-hidden="true">
          {["🎉","🌍","⭐","🎊","✨","🏆","🌟","🎈"].map((e, i) => (
            <span key={i} className="confetti-piece" style={{ "--i": i }}>{e}</span>
          ))}
        </div>

        <div className="win-modal__icon">🏆</div>
        <h2 className="win-modal__title">You Won!</h2>
        <p className="win-modal__subtitle">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} completed
        </p>

        {/* Streak milestone callout */}
        {isStreakMilestone && (
          <div className="streak-milestone">
            🔥 {streak}-day streak milestone! Keep it up!
          </div>
        )}

        <div className="win-modal__stats">
          <div className="win-stat">
            <span className="win-stat__icon">🃏</span>
            <span className="win-stat__value">{moves}</span>
            <span className="win-stat__label">Moves</span>
          </div>
          <div className="win-stat">
            <span className="win-stat__icon">⭐</span>
            <span className="win-stat__value">{score}</span>
            <span className="win-stat__label">Pairs</span>
          </div>
          <div className="win-stat">
            <span className="win-stat__icon">⏱️</span>
            <span className="win-stat__value">{formatTime(elapsedTime)}</span>
            <span className="win-stat__label">Time</span>
          </div>
          <div className="win-stat">
            <span className="win-stat__icon">🔥</span>
            <span className="win-stat__value">{streak}d</span>
            <span className="win-stat__label">Streak</span>
          </div>
        </div>

        <p className="win-modal__saved">✓ Score saved to leaderboard</p>

        <div className="win-modal__actions">
          <button className="btn btn--primary" onClick={onPlayAgain}>Play Again</button>
          <button className="btn btn--secondary" onClick={onViewLeaderboard}>Leaderboard</button>
        </div>
      </div>
    </div>
  );
};