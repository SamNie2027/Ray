import { leaderboardOutput } from "../dtos/leaderboardDTO";
import { NewUserInput } from "../dtos/newUserDTO";

type CreatedUser = { id: number; email: string };

export class UserService {
  private _nextId = 2; // simple local id generator for stubbed returns

  async createUser(user: NewUserInput): Promise<CreatedUser> {
    // Validate input minimally
    if (!user.email || !user.password || !user.name) {
      throw new Error("Missing required user fields");
    }

    // TODO: Insert the user into your DB using your chosen SDK/ORM and return the created record.
    // e.g. const created = await db.users.create({ data: { ...user } });

    // For now, return a stubbed created user object (keeps tests passing)
    const created = { id: 1, email: user.email };
    return created;
  }

  async changeLocationPref(userId: number, pref: string) {
    // TODO: Update the user's giving_location_pref in DB.
    // e.g. await db.users.update({ where: { id: userId }, data: { giving_location_pref: pref } });

    // Return a small shape indicating the change
    return { userId, location: pref };
  }

  async addGive(userId: number) {
    // TODO: In a transaction, increment the user's streak and record the give event.
    // e.g. const updated = await db.$transaction([...])

    // Return a stubbed response. In a real impl this should come from the DB.
    const streak = 8;
    return { userId, streak };
  }

  async getStreak(userId: number) {
    // TODO: Read the current streak for userId from the DB
    // e.g. const user = await db.users.findUnique({ where: { id: userId } });

    // Return a stubbed value for now
    const streak = 7;
    return { userId, streak };
  }

  async getLeaderboard(): Promise<leaderboardOutput> {
    // TODO: Query the DB for top users by streak and map to leaderboard entries.
    // e.g. const rows = await db.users.findMany({ orderBy: { streak: 'desc' }, take: 10 });

    // Return a stubbed leaderboard
    return {
      leaderboard: [
        { displayname: "Alice", streak: 12 },
        { displayname: "Bob", streak: 10 }
      ]
    };
  }
}

export const userService = new UserService();
