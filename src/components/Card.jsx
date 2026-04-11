export const Card = ({ card, onClick }) => {
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
        <div className="card__front">
          <span className="card__question">?</span>
        </div>
        <div className="card__back">
          {card.img ? (
            <img className="card__img" src={card.img} alt={card.name} draggable={false} />
          ) : (
            <span className="card__emoji">{card.emoji}</span>
          )}
          {card.isMatched && <span className="card__name">{card.name}</span>}
        </div>
      </div>
    </div>
  );
};