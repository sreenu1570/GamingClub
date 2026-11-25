export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );
}

export function saveScore(game, points) {
  const currentUser = getCurrentUser();

  if (!currentUser) return;

  const users = getUsers();

  const user = users.find(
    (u) => u.email === currentUser.email
  );

  if (!user) return;

  user.scores = user.scores || {};

  if (game === "snake") {
    user.scores[game] = Math.max(
      user.scores[game] || 0,
      points
    );
  } else {
    user.scores[game] =
      (user.scores[game] || 0) + points;
  }

  localStorage.setItem("users", JSON.stringify(users));
}