import { useCallback, useEffect, useState } from "react";
import { saveScore, readScores, readSettings, updateSettings } from "../services/storage.js";
import { updateUserStats } from "../services/auth.js";
import { fetchAfricanFlags, getWildlifeCards } from "../services/api.js";

export const DIFFICULTY_CONFIG = {

  easy:   { pairs: 6,  label: "Easy",   cols: 3 },
  medium: { pairs: 8,  label: "Medium",  cols: 4 },
  hard:   { pairs: 12, label: "Hard",    cols: 6 },
};

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const useGameLogic = (currentUser) => {
  const userKey = currentUser?.key || "guest";

  const [settings, setSettings]         = useState(() => readSettings(userKey));
  const [scores, setScores]             = useState(() => readScores());
  const [cards, setCards]               = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore]               = useState(0);
  const [moves, setMoves]               = useState(0);
  const [isLocked, setIsLocked]         = useState(false);
  const [elapsedTime, setElapsedTime]   = useState(0);
  const [timerActive, setTimerActive]   = useState(false);
  const [showWin, setShowWin]           = useState(false);
  const [cardPool, setCardPool]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [streak, setStreak]             = useState(currentUser?.streak || 0);

  const config = DIFFICULTY_CONFIG[settings.difficulty];

  // Fetch cards from API when theme changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const load = async () => {
      const pool = settings.theme === "flags"
        ? await fetchAfricanFlags()
        : getWildlifeCards();
      if (!cancelled) { setCardPool(pool); setLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, [settings.theme]);

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    const id = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  // Initialize game
  const initializeGame = useCallback(() => {
    if (!cardPool.length) return;
    const picked = shuffleArray(cardPool).slice(0, config.pairs);
    const doubled = shuffleArray([...picked, ...picked]);
    setCards(doubled.map((item, i) => ({
      id: i, name: item.name,
      img: item.img || null, emoji: item.emoji || null,
      isFlipped: false, isMatched: false,
    })));
    setFlippedCards([]); setMatchedCards([]);
    setScore(0); setMoves(0);
    setIsLocked(false); setElapsedTime(0);
    setTimerActive(false); setShowWin(false);
  }, [cardPool, config.pairs]);

  useEffect(() => {
    if (!loading) initializeGame();
  }, [loading, initializeGame]);

  // Win detection
  useEffect(() => {
    if (!cards.length || matchedCards.length !== cards.length) return;
    setTimerActive(false);
    setShowWin(true);
    if (currentUser) {
      saveScore({
        playerName: currentUser.username,
        userKey: currentUser.key,
        moves, score, time: elapsedTime,
        difficulty: settings.difficulty,
        theme: settings.theme,
      });
      const updated = updateUserStats(currentUser.key, { moves, score });
      if (updated) setStreak(updated.streak);
      setScores(readScores());
    }
  }, [matchedCards, cards.length]);

  // Card click
  const handleCardClick = useCallback((card) => {
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;
    if (moves === 0 && flippedCards.length === 0) setTimerActive(true);

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.name === card.name) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setCards((prev) => prev.map((c) =>
            c.id === card.id || c.id === firstCard.id ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]); setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setIsLocked(false); setFlippedCards([]);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [cards, flippedCards, isLocked, moves]);

  const changeSettings = (data) => {
    const updated = updateSettings(userKey, data);
    setSettings(updated);
  };

  return {
    cards, score, moves, elapsedTime,
    isGameComplete: matchedCards.length > 0 && matchedCards.length === cards.length,
    showWin, setShowWin, handleCardClick, initializeGame,
    config, loading, scores, settings, changeSettings,
    streak, DIFFICULTY_CONFIG,
  };
};