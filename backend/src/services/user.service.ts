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
    const sql = `INSERT INTO users (name, email, username, password_hash, giving_location_pref, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
    const params = [user.name, user.email, user.username || null, user.password, user.giving_location_pref];

    const resp: any = await dbService.executeSql({ sql, parameters: params });

    // mysql2's execute returns an OkPacket as part of the result when running INSERT via pool.execute.
    // Our dbService.executeSql returns { records, columnMetadata } for compatibility; when using INSERT
    // we can query the inserted id with LAST_INSERT_ID(). Simpler: run a follow-up select using the email.
    const lookup = `SELECT id, email FROM users WHERE email = ? LIMIT 1`;
    const look = await dbService.executeSql({ sql: lookup, parameters: [user.email] }) as any;
    const rows: any[] = Array.isArray(look?.records) ? look.records : [];
    if (rows.length === 0) throw new Error('User insert failed');

    const created = { id: rows[0].id, email: rows[0].email };
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
