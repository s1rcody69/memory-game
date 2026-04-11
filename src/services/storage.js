const SCORES_KEY = "mg_scores";

// ─── READ all scores (global leaderboard) ────────────────────────────────────
export const readScores = () => {
  try { return JSON.parse(localStorage.getItem(SCORES_KEY)) || []; }
  catch { return []; }
};

// ─── CREATE – save a new score entry ─────────────────────────────────────────
export const saveScore = (entry) => {
  const scores = readScores();
  const newScore = {
    ...entry,
    id: Date.now(),
    date: new Date().toISOString(),
  };
  const updated = [newScore, ...scores].slice(0, 100);
  localStorage.setItem(SCORES_KEY, JSON.stringify(updated));
  return newScore;
};

// ─── READ settings per user ───────────────────────────────────────────────────
export const readSettings = (userKey) => {
  try {
    return (
      JSON.parse(localStorage.getItem(`mg_settings_${userKey}`)) || {
        difficulty: "medium",
        theme: "flags",
      }
    );
  } catch {
    return { difficulty: "medium", theme: "flags" };
  }
};

// ─── UPDATE settings per user ────────────────────────────────────────────────
export const updateSettings = (userKey, data) => {
  const current = readSettings(userKey);
  const updated = { ...current, ...data };
  localStorage.setItem(`mg_settings_${userKey}`, JSON.stringify(updated));
  return updated;
};