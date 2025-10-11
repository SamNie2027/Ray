import { UserService } from '../src/services/user.service';
import { dbService } from '../src/services/db.service';

describe('UserService', () => {
  afterEach(() => jest.restoreAllMocks());

  test('createUser succeeds and returns id/email', async () => {
    const svc = new UserService();
    const newUser = { name: 'Alice', email: 'alice@example.com', password: 'pw', username: 'alice', giving_location_pref: 'online' };

    // Mock dbService.insertUser to return a created user row
    jest.spyOn(dbService, 'insertUser').mockResolvedValue({ id: 42, name: 'Alice', email: 'alice@example.com', password: 'pw', username: 'alice', giving_location_pref: 'online', daily_streak: 0, orgs_given_before: [] });

    const created = await svc.createUser(newUser as any);
    expect(created).toEqual({ id: 42, email: 'alice@example.com' });
  });

  test('createUser throws on missing fields', async () => {
    const svc = new UserService();
    await expect(svc.createUser({ email: 'a@b.com' } as any)).rejects.toThrow('Missing required user fields');
  });

  test('changeLocationPref forwards to dbService and returns updated user', async () => {
    const svc = new UserService();
  jest.spyOn(dbService, 'updateUserLocationPref').mockResolvedValue({ id: 5, name: 'Bob', email: 'b@b.com', giving_location_pref: 'in_person', password: 'x', daily_streak: 1, orgs_given_before: [] });

  const out = await svc.changeLocationPref(5, 'in_person');
    expect(out).toHaveProperty('id', 5);
  expect(out).toHaveProperty('giving_location_pref', 'in_person');
  });

  test('addGive returns new streak', async () => {
    const svc = new UserService();
    jest.spyOn(dbService, 'addGive').mockResolvedValue(7);

    const out = await svc.addGive(7);
    expect(out).toEqual({ userId: 7, streak: 7 });
  });

  test('getStreak returns current streak', async () => {
    const svc = new UserService();
    jest.spyOn(dbService, 'getStreak').mockResolvedValue(3);

    const out = await svc.getStreak(3);
    expect(out).toEqual({ userId: 3, streak: 3 });
  });

  test('getLeaderboard returns mapped leaderboard', async () => {
    const svc = new UserService();
    const rows = [{ displayname: 'X', streak: 10 }, { displayname: 'Y', streak: 5 }];
    jest.spyOn(dbService, 'getTopUsers').mockResolvedValue(rows as any);

    const out = await svc.getLeaderboard();
    expect(out).toHaveProperty('leaderboard');
    expect(out.leaderboard).toHaveLength(2);
    expect(out.leaderboard[0]).toEqual(rows[0]);
  });
});
