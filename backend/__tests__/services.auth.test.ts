import { AuthService } from '../src/services/auth.service';
import { dbService } from '../src/services/db.service';

describe('AuthService', () => {
  afterEach(() => jest.restoreAllMocks());

  test('login succeeds with correct credentials', async () => {
    const svc = new AuthService();
    jest.spyOn(dbService, 'getUserByEmail').mockResolvedValue({ id: 1, name: 'User', email: 'a@b.com', password: 'secret', giving_location_pref: 'online', daily_streak: 0, orgs_given_before: [] });

    const ret = await svc.login({ email: 'a@b.com', password: 'secret' });
    expect(ret).toHaveProperty('token');
  });

  test('login fails when user not found', async () => {
    const svc = new AuthService();
    jest.spyOn(dbService, 'getUserByEmail').mockResolvedValue(null);
    await expect(svc.login({ email: 'nope', password: 'x' })).rejects.toThrow('Invalid credentials');
  });

  test('login fails when password mismatch', async () => {
    const svc = new AuthService();
    jest.spyOn(dbService, 'getUserByEmail').mockResolvedValue({ id: 2, name: 'User2', email: 'a@b.com', password: 'right', giving_location_pref: 'online', daily_streak: 0, orgs_given_before: [] });
    await expect(svc.login({ email: 'a@b.com', password: 'wrong' })).rejects.toThrow('Invalid credentials');
  });
});

