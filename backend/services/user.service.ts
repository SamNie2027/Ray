export class UserService {
  async createUser(email: string, password: string) {
    return { id: 1, email };
  }

  async changeLocationPref(userId: number, location: string) {
    return { userId, location };
  }

  async addGive(userId: number) {
    return { userId, streak: 8 };
  }

  async getStreak(userId: number) {
    return { userId, streak: 7 };
  }

  async getLeaderboard() {
    return [
      { username: "Alice", streak: 12 },
      { username: "Bob", streak: 10 },
      { username: "Anonymous", streak: 8 }
    ];
  }
}

export const userService = new UserService();
