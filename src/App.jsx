import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";
import { WinMessage } from "./components/WinMessage";


const cardValues = [
  "🇰🇪",
  "🇹🇿",
  "🇺🇬",
  "🇳🇬",
  "🇿🇦",
  "🇬🇭",
  "🇪🇬",
  "🇲🇦",
  "🇰🇪",
  "🇹🇿",
  "🇺🇬",
  "🇳🇬",
  "🇿🇦",
  "🇬🇭",
  "🇪🇬",
  "🇲🇦",
]

function App() {
  

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
