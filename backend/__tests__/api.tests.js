import request from "supertest";
import express from "express";

// bring in your app (refactor server into app.js)
import app from "../app.js";

describe("API Endpoints", () => {
  // USERS
  it("should create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should update a user's location preference", async () => {
    const res = await request(app)
      .patch("/users/1/preferences/location")
      .send({ location: "online" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Location preference updated/);
  });

  it("should add a give for a user", async () => {
    const res = await request(app).post("/users/1/gives");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Give added/);
  });

  it("should get a user's streak", async () => {
    const res = await request(app).get("/users/1/streak");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("streak");
  });

  // AUTH
  it("should login a user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  // LEADERBOARD
  it("should return leaderboard data", async () => {
    const res = await request(app).get("/leaderboard");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("username");
    expect(res.body[0]).toHaveProperty("streak");
  });

  // ORGS
  it("should return orgs list with a limit", async () => {
    const res = await request(app).get("/orgs?limit=5");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return a specific org", async () => {
    const res = await request(app).get("/orgs/123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
