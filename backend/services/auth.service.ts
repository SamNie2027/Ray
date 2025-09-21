export class AuthService {
  async login(email: string, password: string) {
    if (email === "test@example.com" && password === "password123") {
      return { token: "fake-jwt-token" };
    }
    throw new Error("Invalid credentials");
  }
}

export const authService = new AuthService();
