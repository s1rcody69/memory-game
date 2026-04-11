import { useState } from "react";
import { getCurrentUser, logout } from "./services/auth";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { WinModal } from "./components/WinModal";
import { Leaderboard } from "./components/Leaderboard";
import { SettingsModal } from "./components/SettingsModal";
import { useGameLogic, DIFFICULTY_CONFIG } from "./hooks/useGameLogic";

function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [view, setView]               = useState("game");
  const [showSettings, setShowSettings] = useState(false);

  const {
    cards, score, moves, elapsedTime,
    showWin, setShowWin, handleCardClick, initializeGame,
    config, loading, scores, settings, changeSettings, streak,
  } = useGameLogic(currentUser);

  const handleLogin = () => setCurrentUser(getCurrentUser());

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <div className="app-inner">
        <GameHeader
          score={score}
          moves={moves}
          elapsedTime={elapsedTime}
          onReset={initializeGame}
          currentUser={currentUser}
          streak={streak}
          view={view}
          setView={setView}
          onSettingsOpen={() => setShowSettings(true)}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {view === "game" ? (
          <main className="game-area">
            <div className="difficulty-badge">
              {settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1)}
              {" · "}{config.pairs} pairs · {settings.theme}
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading cards…</p>
              </div>
            ) : (
              <div
                className="cards-grid"
                style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
              >
                {cards.map((card) => (
                  <Card key={card.id} card={card} onClick={handleCardClick} />
                ))}
              </div>
            )}

            {/* Guest nudge — shown once cards are visible */}
            {!currentUser && !loading && (
              <p className="guest-nudge">
                🏆 Sign in to save your scores to the leaderboard and track streaks!
              </p>
            )}
          </main>
        ) : (
          <Leaderboard scores={scores} currentUser={currentUser} />
        )}
      </div>

      {showWin && (
        <WinModal
          moves={moves}
          score={score}
          elapsedTime={elapsedTime}
          difficulty={settings.difficulty}
          streak={streak}
          currentUser={currentUser}
          onPlayAgain={() => { setShowWin(false); initializeGame(); }}
          onViewLeaderboard={() => { setShowWin(false); setView("leaderboard"); }}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onChange={changeSettings}
          onClose={() => { setShowSettings(false); initializeGame(); }}
          DIFFICULTY_CONFIG={DIFFICULTY_CONFIG}
        />
      )}
    </div>
  );
}

export default App;
