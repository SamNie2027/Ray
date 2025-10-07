import { loginInput } from "../dtos/loginDTO";
import { authReturn } from "../dtos/authReturnDTO";
import * as crypto from "crypto";

export class AuthService {
  async login(login: loginInput): Promise<authReturn> {
    const { email, password } = login;

    // Simple credential check for now (replace with DB lookup in future)
    if (email === "test@example.com" && password === "password123") {
      const secret = process.env.JWT_SECRET || "dev-secret";
      const payload = `${email}:${Date.now()}`;
      const token = crypto.createHmac("sha256", secret).update(payload).digest("hex");
      return { token };
    }

    // Keep the simple error shape the server expects
    throw new Error("Invalid credentials");
  }
}

export const authService = new AuthService();
