import { useState } from "react";

export const Card = ({ card, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const isFlag     = card.type === "flag";
  const isWildlife = card.type === "wildlife";
  const isFruit    = card.type === "fruit";

  return (
    <div
      className={`card ${card.isFlipped ? "card--flipped" : ""} ${card.isMatched ? "card--matched" : ""}`}
      onClick={() => onClick(card)}
      role="button"
      aria-label={card.isFlipped || card.isMatched ? card.name : "Hidden card"}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(card)}
    >
      <div className="card__inner">

        {/* front hiddem */}
        <div className="card__front">
          <span className="card__question">?</span>
        </div>

        {/*  Back revealed */}
        <div className={`card__back ${isFlag ? "card__back--flag" : ""} ${isWildlife ? "card__back--wildlife" : ""} ${isFruit ? "card__back--fruit" : ""}`}>

          {/*  full flag image with contain */}
          {isFlag && (
            <>
              {card.img && !imgError ? (
                <div className="card__flag-wrap">
                  <img
                    className="card__flag-img"
                    src={card.img}
                    alt={card.name}
                    draggable={false}
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                <span className="card__emoji">🏳️</span>
              )}
            </>
          )}

          {/* Wildlife photo*/}
          {isWildlife && (
            <>
              {card.img && !imgError ? (
                <img
                  className="card__wildlife-img"
                  src={card.img}
                  alt={card.name}
                  draggable={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="card__emoji">🦁</span>
              )}
            </>
          )}

          {/* Fruit emoji, no image */}
          {isFruit && (
            <span className="card__fruit-emoji">{card.emoji}</span>
          )}

          {/* Country / animal / fruit name — always visible at bottom */}
          <span className="card__name">{card.name}</span>
        </div>

      </div>
    </div>
  );
};