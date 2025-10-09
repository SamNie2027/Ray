import * as request from "supertest";
const app = require("../app.cjs");
import { userService } from "../src/services/user.service";
import { authService } from "../src/services/auth.service";
import { orgService } from "../src/services/org.service";
import type { loginInput } from "../src/dtos/loginDTO";
import type { leaderboardOutput } from "../src/dtos/leaderboardDTO";

jest.mock("../src/services/user.service");
jest.mock("../src/services/auth.service");
jest.mock("../src/services/org.service");

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

    const loginPayload: loginInput = { email: "test@example.com", password: "password123" };

    const res = await request(app)
      .post("/auth/login")
      .send(loginPayload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: "fake-jwt-token" });
  });

  it("should return leaderboard data", async () => {
    const leaderboardMock: leaderboardOutput = {
      leaderboard: [
        { displayname: "Alice", streak: 12 },
        { displayname: "Bob", streak: 10 }
      ]
    };

    (userService.getLeaderboard as jest.Mock).mockResolvedValue(leaderboardMock);

    const res = await request(app).get("/leaderboard");

    expect(res.statusCode).toBe(200);
    expect(res.body.leaderboard).toHaveLength(2);
    expect(res.body.leaderboard[0]).toHaveProperty("displayname", "Alice");
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
