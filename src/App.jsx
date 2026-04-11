import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "./services/auth.js";
import { AuthModal } from "./components/AuthModal.jsx";
import { GameHeader } from "./components/GameHeader.jsx";
import { Card } from "./components/Card.jsx";
import { WinModal } from "./components/WinModal.jsx";
import { Leaderboard } from "./components/Leaderboard.jsx";
import { SettingsModal } from "./components/SettingsModal.jsx";
import { useGameLogic, DIFFICULTY_CONFIG } from "./hooks/useGameLogic.js";

function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [view, setView] = useState("game");
  const [showSettings, setShowSettings] = useState(false);

  const {
    cards, score, moves, elapsedTime,
    showWin, setShowWin, handleCardClick, initializeGame,
    config, loading, scores, settings,
    changeSettings, streak,
  } = useGameLogic(currentUser);

  // Re-read user when they log in (streak may have updated)
  const handleLoginSuccess = (user) => {
    setCurrentUser(getCurrentUser());
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  // Show auth wall if not logged in
  if (!currentUser) {
    return <AuthModal onSuccess={handleLoginSuccess} />;
  }

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
