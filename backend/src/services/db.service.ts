import { loginInput } from "../dtos/loginDTO";
import { userOutput } from "../dtos/userOutputDTO";
import { createPool, Pool } from "mysql2/promise";

export class DBService {
    private pool: Pool;

    constructor() {
        const host = process.env.DB_HOST || "127.0.0.1";
        const port = parseInt(process.env.DB_PORT || "3306", 10);
        const user = process.env.DB_USER || "root";
        const password = process.env.DB_PASSWORD || "";
        const database = process.env.DB_NAME || "raydb";

        this.pool = createPool({
            host,
            port,
            user,
            password,
            database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    /**
     * Gracefully close the underlying pool. Useful for tests to allow Node to exit.
     */
    async close() {
        try {
            await this.pool.end();
        } catch (e) {
            // ignore errors during shutdown
        }
    }

    /**
     * Execute a SQL statement against the configured MySQL pool.
     * - sql: parameterized SQL using `?` placeholders
     * - parameters: array of values (in order) or an array of AWS-style param objects (name/value)
     */
    async executeSql({ sql, parameters = [], includeResultMetadata = false }: { sql: string; parameters?: any[]; includeResultMetadata?: boolean }) {
        // Normalize parameters: allow either plain array of values or aws-rds-data style params
        const paramsConverted = (parameters || []).map((p: any) => {
            if (p && typeof p === "object" && "name" in p && "value" in p) {
                // RDS Data parameter format: { name, value: { stringValue, longValue, doubleValue, booleanValue } }
                const valObj = p.value || {};
                return valObj.stringValue ?? valObj.longValue ?? valObj.doubleValue ?? valObj.booleanValue ?? null;
            }
            return p;
        });

        const [rows, fields] = await this.pool.execute(sql, paramsConverted);

        // Return a light compatibility layer similar to previous RDS-data shape the code expected
        return {
            records: rows,
            columnMetadata: Array.isArray(fields) ? (fields as any[]).map((f: any) => ({ name: f.name })) : [],
        };
    }

        // --- Row -> DTO mappers ---
        private mapUserRow(row: any): userOutput {
            // Ensure JSON parsing and types
            let orgsGivenBefore: number[] = [];
            try {
                if (row.orgs_given_before == null) {
                    orgsGivenBefore = [];
                } else if (typeof row.orgs_given_before === 'string') {
                    orgsGivenBefore = JSON.parse(row.orgs_given_before);
                } else {
                    orgsGivenBefore = row.orgs_given_before;
                }
            } catch (e) {
                orgsGivenBefore = [];
            }

                    const out: userOutput = {
                        id: typeof row.id === 'number' ? row.id : -1,
                    name: row.name,
                    email: row.email,
                    password: row.password,
                    username: row.username || undefined,
                    giving_location_pref: row.giving_location_pref,
                    daily_streak: Number(row.daily_streak) || 0,
                    orgs_given_before: orgsGivenBefore,
                };

            return out;
        }

        private mapOrgRow(row: any) {
            return {
                org_id: row.org_id,
                name: row.name,
                description: row.description,
                website: row.website,
                donation_url: row.donation_url,
                cause: row.cause,
                zip: row.zip,
                city: row.city,
                state: row.state,
                country: row.country,
            };
        }

    // Simple login helper that checks email/password against the users table
    async login(login: loginInput): Promise<userOutput> {
        const { email, password } = login;

    const sql = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before
                 FROM users
                 WHERE email = ? AND password = ?
                 LIMIT 1`;

        const [rows] = await this.pool.execute(sql, [email, password]);
        const results: any[] = Array.isArray(rows) ? (rows as any[]) : [];

        if (results.length === 0) {
            throw new Error("Invalid credentials");
        }

        const row = results[0];

        // Parse JSON column if necessary
        let orgsGivenBefore: number[] = [];
        try {
            if (row.orgs_given_before == null) {
                orgsGivenBefore = [];
            } else if (typeof row.orgs_given_before === "string") {
                orgsGivenBefore = JSON.parse(row.orgs_given_before);
            } else {
                orgsGivenBefore = row.orgs_given_before;
            }
        } catch (e) {
            orgsGivenBefore = [];
        }

        return this.mapUserRow(row);
    }

        // --- Convenience stub methods for higher-level services ---

        /** Returns a single user row by email or null */
        async getUserByEmail(email: string) {
                const sql = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before FROM users WHERE email = ? LIMIT 1`;
            const resp: any = await this.executeSql({ sql, parameters: [email] });
                const rows = Array.isArray(resp.records) ? resp.records : [];
                return rows[0] ? this.mapUserRow(rows[0]) : null;
        }

        /** Insert a user and return the inserted id (or null on failure) */
        async insertUser({ name, email, username, password, giving_location_pref }: any) {
            const sql = `INSERT INTO users (name, email, username, password, giving_location_pref, created_at, updated_at)
                                     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
            await this.executeSql({ sql, parameters: [name, email, username || null, password, giving_location_pref] });
            // fetch back the inserted row
            const created = await this.getUserByEmail(email);
            return created ? this.mapUserRow(created) : null;
        }

        /** Return a list of orgs, optionally limited */
        async getOrgs(limit = 10) {
        const sql = `SELECT org_id, name, description, website, donation_url, cause, zip, city, state, country FROM orgs LIMIT ?`;
        const resp: any = await this.executeSql({ sql, parameters: [limit] });
        const rows = Array.isArray(resp.records) ? resp.records : [];
        return rows.map(r => this.mapOrgRow(r));
        }

        /** Get specific org by id */
        async getOrgById(orgId: number) {
        const sql = `SELECT org_id, name, description, website, donation_url, cause, zip, city, state, country FROM orgs WHERE org_id = ? LIMIT 1`;
        const resp: any = await this.executeSql({ sql, parameters: [orgId] });
        const rows = Array.isArray(resp.records) ? resp.records : [];
        return rows[0] ? this.mapOrgRow(rows[0]) : null;
        }

            /** Update a user's giving_location_pref */
            async updateUserLocationPref(userId: number, pref: string) {
                const sql = `UPDATE users SET giving_location_pref = ?, updated_at = NOW() WHERE id = ?`;
                await this.executeSql({ sql, parameters: [pref, userId] });
                const sql2 = `SELECT id, name, email, password, username, giving_location_pref, daily_streak, orgs_given_before FROM users WHERE id = ? LIMIT 1`;
                const resp: any = await this.executeSql({ sql: sql2, parameters: [userId] });
                const rows = Array.isArray(resp.records) ? resp.records : [];
                return rows[0] ? this.mapUserRow(rows[0]) : null;
            }

            /** Increment the user's daily_streak by 1 and return the new streak */
            async addGive(userId: number) {
                const sql = `UPDATE users SET daily_streak = daily_streak + 1, updated_at = NOW() WHERE id = ?`;
                await this.executeSql({ sql, parameters: [userId] });
                const resp: any = await this.executeSql({ sql: `SELECT daily_streak FROM users WHERE id = ? LIMIT 1`, parameters: [userId] });
                const rows = Array.isArray(resp.records) ? resp.records : [];
                return rows[0] ? Number(rows[0].daily_streak) : null;
            }

            /** Get a user's current streak */
            async getStreak(userId: number) {
                const resp: any = await this.executeSql({ sql: `SELECT daily_streak FROM users WHERE id = ? LIMIT 1`, parameters: [userId] });
                const rows = Array.isArray(resp.records) ? resp.records : [];
                return rows[0] ? Number(rows[0].daily_streak) : 0;
            }

            /** Return top users ordered by streak */
            async getTopUsers(limit = 10) {
                const resp: any = await this.executeSql({ sql: `SELECT COALESCE(username, name) AS displayname, daily_streak AS streak FROM users ORDER BY daily_streak DESC LIMIT ?`, parameters: [limit] });
                const rows = Array.isArray(resp.records) ? resp.records : [];
                // ensure numeric streak
                return rows.map(r => ({ displayname: r.displayname, streak: Number(r.streak) }));
            }
}

export const dbService = new DBService();