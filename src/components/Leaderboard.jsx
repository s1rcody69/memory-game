const formatTime = (s) => {
  if (!s && s !== 0) return "--";
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch { return "--"; }
};

const MEDAL = ["🥇", "🥈", "🥉"];

export const Leaderboard = ({ scores, currentUser }) => {
  if (!scores.length) {
    return (
      <main className="leaderboard leaderboard--empty">
        <div className="leaderboard__empty-icon">🏆</div>
        <h2 className="leaderboard__empty-title">No scores yet</h2>
        <p className="leaderboard__empty-msg">Complete a game to appear on the leaderboard!</p>
      </main>
    );
  }

  return (
    <main className="leaderboard">
      <div className="leaderboard__header">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <span className="leaderboard__count">{scores.length} entries</span>
      </div>

      <div className="leaderboard__list">
        {scores.map((entry, idx) => {
          const isMe = entry.userKey === currentUser?.key;
          return (
            <div
              key={entry.id}
              className={`leaderboard__row ${idx < 3 ? "leaderboard__row--top" : ""} ${isMe ? "leaderboard__row--me" : ""}`}
            >
              <span className="leaderboard__rank">
                {idx < 3 ? MEDAL[idx] : `#${idx + 1}`}
              </span>

              <div className="leaderboard__info">
                <span className="leaderboard__name">
                  {entry.playerName || "Anonymous"}
                  {isMe && <span className="leaderboard__you-badge"> You</span>}
                </span>
                <span className="leaderboard__meta">
                  {entry.difficulty} · {entry.theme} · {formatDate(entry.date)}
                </span>
              </div>

              <div className="leaderboard__scores">
                <span className="leaderboard__score-item" title="Pairs matched">⭐ {entry.score}</span>
                <span className="leaderboard__score-item" title="Moves taken">🃏 {entry.moves}</span>
                <span className="leaderboard__score-item" title="Time">⏱ {formatTime(entry.time)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};