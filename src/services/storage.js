const SCORES_KEY = "mg_scores";

export const readScores = () => {
  try { return JSON.parse(localStorage.getItem(SCORES_KEY)) || []; }
  catch { return []; }
};

export const saveScore = (entry) => {
  const scores  = readScores();
  const newScore = { ...entry, id: Date.now(), date: new Date().toISOString() };
  localStorage.setItem(SCORES_KEY, JSON.stringify([newScore, ...scores].slice(0, 100)));
  return newScore;
};

export const readSettings = (userKey) => {
  try {
    return JSON.parse(localStorage.getItem(`mg_settings_${userKey}`)) ||
      { difficulty: "medium", theme: "flags" };
  } catch { return { difficulty: "medium", theme: "flags" }; }
};

export const updateSettings = (userKey, data) => {
  const current = readSettings(userKey);
  const updated = { ...current, ...data };
  localStorage.setItem(`mg_settings_${userKey}`, JSON.stringify(updated));
  return updated;
};