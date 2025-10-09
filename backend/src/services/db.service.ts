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

    // Simple login helper that checks email/password against the users table
    async login(login: loginInput): Promise<userOutput> {
        const { email, password } = login;

        const sql = `SELECT name, email, password_hash, username, giving_location_pref, daily_streak, orgs_given_before
                                 FROM users
                                 WHERE email = ? AND password_hash = ?
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

        const out: userOutput = {
            name: row.name,
            email: row.email,
            password: row.password_hash,
            username: row.username || undefined,
            giving_location_pref: row.giving_location_pref,
            daily_streak: Number(row.daily_streak) || 0,
            orgs_given_before: orgsGivenBefore,
        };

        return out;
    }
}

export const dbService = new DBService();