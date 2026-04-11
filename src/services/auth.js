// ─── Simple hash (not cryptographic — for demo/portfolio only) ────────────────
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

const USERS_KEY = "mg_users";
const SESSION_KEY = "mg_session";

// ─── Read / write all users ───────────────────────────────────────────────────
const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
  catch { return {}; }
};

const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

// ─── Session ──────────────────────────────────────────────────────────────────
export const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
};

const saveSession = (username) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(username));

export const logout = () => localStorage.removeItem(SESSION_KEY);

// ─── Register ─────────────────────────────────────────────────────────────────
export const register = (username, password) => {
  const trimmed = username.trim();
  if (trimmed.length < 2) return { error: "Username must be at least 2 characters." };
  if (password.length < 4) return { error: "Password must be at least 4 characters." };

  const users = getUsers();
  const key = trimmed.toLowerCase();

  if (users[key]) return { error: "Username already taken." };

  users[key] = {
    username: trimmed,
    passwordHash: simpleHash(password),
    gamesPlayed: 0,
    bestMoves: null,
    streak: 0,
    lastWinDate: null,
    createdAt: new Date().toISOString(),
  };

  saveUsers(users);
  saveSession(key);
  return { user: users[key] };
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = (username, password) => {
  const key = username.trim().toLowerCase();
  const users = getUsers();

  if (!users[key]) return { error: "No account found with that username." };
  if (users[key].passwordHash !== simpleHash(password))
    return { error: "Incorrect password." };

  saveSession(key);
  return { user: users[key] };
};

// ─── Get current user ────────────────────────────────────────────────────────
export const getCurrentUser = () => {
  const key = getSession();
  if (!key) return null;
  const users = getUsers();
  return users[key] ? { ...users[key], key } : null;
};

// ─── Update user stats after a win ───────────────────────────────────────────
export const updateUserStats = (username, { moves, score }) => {
  const key = username.toLowerCase();
  const users = getUsers();
  if (!users[key]) return null;

  const user = users[key];
  const today = new Date().toDateString();
  const lastWin = user.lastWinDate ? new Date(user.lastWinDate).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Streak logic
  let streak = user.streak || 0;
  if (lastWin === today) {
    // already won today – streak stays the same
  } else if (lastWin === yesterday) {
    streak += 1; // consecutive day
  } else {
    streak = 1; // reset
  }

  users[key] = {
    ...user,
    gamesPlayed: (user.gamesPlayed || 0) + 1,
    bestMoves: user.bestMoves === null ? moves : Math.min(user.bestMoves, moves),
    streak,
    lastWinDate: new Date().toISOString(),
  };

  saveUsers(users);
  return users[key];
};