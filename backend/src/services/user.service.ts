import { leaderboardOutput } from "../dtos/leaderboardDTO";
import { NewUserInput } from "../dtos/newUserDTO";
import { dbService } from "./db.service";

type CreatedUser = { id: number; email: string };

export class UserService {
  private _nextId = 2; // simple local id generator for stubbed returns

  async createUser(user: NewUserInput): Promise<CreatedUser> {
    // Validate input minimally
    if (!user.email || !user.password || !user.name) {
      throw new Error("Missing required user fields");
    }

    // Insert into the users table. We expect a column `password_hash` so caller should provide a hashed
    // password in `user.password` for production; for local testing this may be plain text.
    const created = await dbService.insertUser({
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      giving_location_pref: user.giving_location_pref,
    });

    if (!created) throw new Error('User insert failed');

    return { id: created.id, email: created.email };
  }

  async changeLocationPref(userId: number, pref: string) {
    const updated = await dbService.updateUserLocationPref(userId, pref);
    return updated;
  }

  async addGive(userId: number) {
    const newStreak = await dbService.addGive(userId);
    return { userId, streak: newStreak };
  }

  async getStreak(userId: number) {
    const streak = await dbService.getStreak(userId);
    return { userId, streak };
  }

  async getLeaderboard(): Promise<leaderboardOutput> {
    const rows: any[] = await dbService.getTopUsers(10);
    return { leaderboard: rows };
  }
}

export const userService = new UserService();
