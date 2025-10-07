const express = require('express');
const { userService } = require('./services/user.service.ts');
const { authService } = require('./services/auth.service.ts');
const { orgService } = require('./services/org.service.ts');

const app = express();
app.use(express.json());

// USERS
app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser(email, password);
  res.json(user);
});

app.patch('/users/:id/preferences/location', async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  const result = await userService.changeLocationPref(Number(id), location);
  res.json(result);
});

app.post('/users/:id/gives', async (req, res) => {
  const { id } = req.params;
  const result = await userService.addGive(Number(id));
  res.json(result);
});

app.get('/users/:id/streak', async (req, res) => {
  const { id } = req.params;
  const result = await userService.getStreak(Number(id));
  res.json(result);
});

// AUTH
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.json(token);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// PROGRESS
app.get('/leaderboard', async (req, res) => {
  const leaderboard = await userService.getLeaderboard();
  res.json(leaderboard);
});

// ORGS
app.get('/orgs', async (req, res) => {
  const { limit = 10 } = req.query;
  const orgs = await orgService.getOrgs(Number(limit));
  res.json(orgs);
});

app.get('/orgs/:id', async (req, res) => {
  const { id } = req.params;
  const org = await orgService.getSpecificOrg(Number(id));
  res.json(org);
});

module.exports = app;
