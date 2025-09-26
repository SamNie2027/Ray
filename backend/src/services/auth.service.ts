import { loginInput } from "../dtos/loginDTO";

export class AuthService {
  async login(login: loginInput) {
    { email, password } = login;
    if (email === "test@example.com" && password === "password123") {
      return { token: "fake-jwt-token" };
    }
    throw new Error("Invalid credentials");
  }
}

export const authService = new AuthService();
