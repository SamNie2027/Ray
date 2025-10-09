import { loginInput } from "../dtos/loginDTO";
import { authReturn } from "../dtos/authReturnDTO";
import * as crypto from "crypto";
import { dbService } from "./db.service";

export class AuthService {
  async login(login: loginInput): Promise<authReturn> {
    const { email, password } = login;

    // Lookup user in DB
    const user: any = await dbService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // For now we compare the stored `password` to provided password directly (local/dev).
    // In a follow-up we should use bcrypt and compare hashes.
    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const secret = process.env.JWT_SECRET || "dev-secret";
    const payload = `${email}:${Date.now()}`;
    const token = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    return { token };
  }
}

export const authService = new AuthService();
