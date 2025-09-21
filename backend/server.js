import express from "express";
const app = express();
app.use(express.json());

// USERS
app.post("/users", (req, res) => {
  // create user logic
  res.json({ message: "User created (or error if exists)" });
});

app.patch("/users/:id/preferences/location", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Location preference updated for user ${id}` });
});

app.post("/users/:id/gives", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Give added for user ${id}, streak updated` });
});

app.get("/users/:id/streak", (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, streak: 7 }); // example stub
});

// AUTH
app.post("/auth/login", (req, res) => {
  res.json({ message: "Login success (or error if bad credentials)" });
});

// PROGRESS
app.get("/leaderboard", (req, res) => {
  res.json([
    { username: "Alice", streak: 12 },
    { username: "Bob", streak: 10 },
    { username: "Anonymous", streak: 8 }
  ]);
});

// ORGANIZATIONS
app.get("/orgs", (req, res) => {
  const { limit } = req.query;
  res.json({ message: `Returning ${limit || 10} orgs` });
});

app.get("/orgs/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Returning org with id ${id}` });
});

// SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
