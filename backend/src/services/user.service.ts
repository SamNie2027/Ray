import { leaderboardOutput } from "../dtos/leaderboardDTO";
import { NewUserInput } from "../dtos/newUserDTO";


export class UserService {
  async createUser(user: NewUserInput) {
    // TODO: Create user in db
    return { id: 1, email: user.email };
  }

  async changeLocationPref(userId: number, pref: string) {
    //TODO: Change location pref in db
    return { userId, location };
  }

  async addGive(userId: number) {
    //TODO: Add give to db
    return { userId, streak: 8 };
  }

  async getStreak(userId: number) {
    //TODO: Get streak from db
    return { userId, streak: 7 };
  }

  async getLeaderboard(): Promise<leaderboardOutput> {
    return null; // TODO: Implement
  }
}

export const userService = new UserService();
