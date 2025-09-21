import * as request from "supertest";
const app = require("../app");
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { orgService } from "../services/org.service";

jest.mock("../services/user.service");
jest.mock("../services/auth.service");
jest.mock("../services/org.service");

describe("API Endpoints (with mocked services)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    (userService.createUser as jest.Mock).mockResolvedValue({ id: 1, email: "test@example.com" });

    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, email: "test@example.com" });
    expect(userService.createUser).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("should login a user", async () => {
    (authService.login as jest.Mock).mockResolvedValue({ token: "fake-jwt-token" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: "fake-jwt-token" });
  });

  it("should return leaderboard data", async () => {
    (userService.getLeaderboard as jest.Mock).mockResolvedValue([
      { username: "Alice", streak: 12 },
      { username: "Bob", streak: 10 }
    ]);

    const res = await request(app).get("/leaderboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("username", "Alice");
  });

  it("should return orgs list", async () => {
    (orgService.getOrgs as jest.Mock).mockResolvedValue([{ id: 1, name: "Org 1" }]);

    const res = await request(app).get("/orgs?limit=1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "Org 1" }]);
  });

  it("should return a specific org", async () => {
    (orgService.getSpecificOrg as jest.Mock).mockResolvedValue({ id: 123, name: "Org 123" });

    const res = await request(app).get("/orgs/123");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 123, name: "Org 123" });
  });
});
