// Overwritten: single clean DBService implementation
import { createPool, Pool } from "mysql2/promise";
import { userOutput } from "../dtos/userOutputDTO";
import { loginInput } from "../dtos/loginDTO";

export class DBService {
  private pool: Pool;

  constructor() {
    const host = process.env.DB_HOST || "127.0.0.1";
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER || "root";
    const password = process.env.DB_PASSWORD || "";
    const database = process.env.DB_NAME || "raydb";
    this.pool = createPool({ host, port, user, password, database, waitForConnections: true, connectionLimit: 5 });
  }

  async close(): Promise<void> {
    try {
      await this.pool.end();
    } catch {
      // ignore
    }
  }

  private async exec(sql: string, params: any[] = []) {
    const [rows] = await this.pool.execute(sql, params);
    return Array.isArray(rows) ? rows : [];
  }

  // Compatibility wrapper used by existing tests/older code.
  // Accepts an object { sql, parameters } and returns { records, columnMetadata }
  async executeSql({ sql, parameters = [] }: { sql: string; parameters?: any[] }) {
    const params = parameters || [];
    const rows: any[] = await this.exec(sql, params);
    return {
      records: rows,
      columnMetadata: [],
    };
  }

  private mapUserRow(row: any): userOutput {
    let orgs: number[] = [];
    try {
      if (row.orgs_given_before == null) orgs = [];
      else if (typeof row.orgs_given_before === 'string') orgs = JSON.parse(row.orgs_given_before);
      else orgs = row.orgs_given_before;
    } catch {
      orgs = [];
    }
    return {
      id: typeof row.id === 'number' ? row.id : Number(row.id) || -1,
      name: row.name,
      email: row.email,
      password: row.password,
      username: row.username || undefined,
      giving_location_pref: row.giving_location_pref,
      daily_streak: Number(row.daily_streak) || 0,
      orgs_given_before: orgs,
    };
  }

  async login(input: loginInput): Promise<userOutput> {
    const sql = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before FROM users WHERE email = ? AND password = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql, parameters: [input.email, input.password] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    if (!rows.length) throw new Error('Invalid credentials');
    return this.mapUserRow(rows[0]);
  }

  async getUserByEmail(email: string) {
    const sql = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before FROM users WHERE email = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql, parameters: [email] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows[0] ? this.mapUserRow(rows[0]) : null;
  }

  async getUserById(id: number) {
    const sql = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before FROM users WHERE id = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql, parameters: [id] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows[0] ? this.mapUserRow(rows[0]) : null;
  }

  async insertUser(data: any) {
    const { name, email, username, password, giving_location_pref } = data;
    const sql = `INSERT INTO users (name, email, username, password, giving_location_pref, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
    await this.executeSql({ sql, parameters: [name, email, username || null, password, giving_location_pref] });
    return this.getUserByEmail(email);
  }

  async getOrgs(limit = 10) {
    const sql = `SELECT org_id, name, description, website, donation_url, cause, zip, city, state, country FROM orgs LIMIT ?`;
    const res: any = await this.executeSql({ sql, parameters: [limit] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows;
  }

  async getOrgById(orgId: number) {
    const sql = `SELECT org_id, name, description, website, donation_url, cause, zip, city, state, country FROM orgs WHERE org_id = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql, parameters: [orgId] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows[0] || null;
  }

  async updateUserLocationPref(userId: number, pref: string) {
    const sql = `UPDATE users SET giving_location_pref = ?, updated_at = NOW() WHERE id = ?`;
    await this.executeSql({ sql, parameters: [pref, userId] });
    return this.getUserById(userId);
  }

  async addGive(userId: number) {
    const sql1 = `UPDATE users SET daily_streak = daily_streak + 1, updated_at = NOW() WHERE id = ?`;
    await this.executeSql({ sql: sql1, parameters: [userId] });
    const sql2 = `SELECT daily_streak FROM users WHERE id = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql: sql2, parameters: [userId] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows[0] ? Number(rows[0].daily_streak) : null;
  }

  async getStreak(userId: number) {
    const sql = `SELECT daily_streak FROM users WHERE id = ? LIMIT 1`;
    const res: any = await this.executeSql({ sql, parameters: [userId] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows[0] ? Number(rows[0].daily_streak) : 0;
  }

  async getTopUsers(limit = 10) {
    const sql = `SELECT COALESCE(username, name) AS displayname, daily_streak AS streak FROM users ORDER BY daily_streak DESC LIMIT ?`;
    const res: any = await this.executeSql({ sql, parameters: [limit] });
    const rows: any[] = Array.isArray(res.records) ? res.records : [];
    return rows.map(r => ({ displayname: r.displayname, streak: Number(r.streak) }));
  }
}

export const dbService = new DBService();