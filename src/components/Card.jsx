import { useState } from "react";

export const Card = ({ card, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const isFlag = card.type === "flag";

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
        {/* Hidden face */}
        <div className="card__front">
          <span className="card__question">?</span>
        </div>

        {/* Revealed face */}
        <div className={`card__back ${isFlag ? "card__back--flag" : "card__back--wildlife"}`}>
          {card.img && !imgError ? (
            <img
              className={isFlag ? "card__flag-img" : "card__wildlife-img"}
              src={card.img}
              alt={card.name}
              draggable={false}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="card__emoji">
              {card.emoji || (isFlag ? "🏳️" : "🦁")}
            </span>
          )}
          <span className="card__name">{card.name}</span>
        </div>
      </div>
    </div>
  );
};