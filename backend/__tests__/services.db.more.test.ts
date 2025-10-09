import { dbService } from '../src/services/db.service';

describe('DBService additional methods', () => {
  afterEach(() => jest.restoreAllMocks());

  test('getUserById returns mapped user or null', async () => {
    const fakeRow = { id: 42, name: 'Ada', email: 'ada@x.com', password: 'p', username: 'ada', giving_location_pref: 'local', daily_streak: 5, orgs_given_before: JSON.stringify([3]) };
    jest.spyOn(dbService as any, 'executeSql').mockResolvedValue({ records: [fakeRow], columnMetadata: [] });

    const out = await (dbService as any).getUserById(42);
    expect(out).not.toBeNull();
    expect(out).toHaveProperty('id', 42);
  });

  test('insertUser calls executeSql and returns created user', async () => {
    const input = { name: 'Neo', email: 'neo@x.com', username: 'neo', password: 'pw', giving_location_pref: 'online' };
    // When insertUser runs it will call executeSql for insert and then getUserByEmail.
    // Mock executeSql to return empty for the insert call, and then a record for getUserByEmail.
    const spy = jest.spyOn(dbService as any, 'executeSql')
      .mockResolvedValueOnce({ records: [], columnMetadata: [] })
      .mockResolvedValueOnce({ records: [{ id: 77, ...input, daily_streak: 0, orgs_given_before: '[]' }], columnMetadata: [] });

    const out = await (dbService as any).insertUser(input);
    expect(spy).toHaveBeenCalled();
    expect(out).toHaveProperty('id', 77);
    expect(out).toHaveProperty('email', 'neo@x.com');
  });

  test('addGive increments streak and returns new streak', async () => {
    // mock update then select
    const spy = jest.spyOn(dbService as any, 'executeSql')
      .mockResolvedValueOnce({ records: [], columnMetadata: [] })
      .mockResolvedValueOnce({ records: [{ daily_streak: 3 }], columnMetadata: [] });

    const newStreak = await (dbService as any).addGive(5);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(newStreak).toBe(3);
  });

  test('getTopUsers returns mapped list', async () => {
    const rows = [ { displayname: 'A', streak: 10 }, { displayname: 'B', streak: 8 } ];
    jest.spyOn(dbService as any, 'executeSql').mockResolvedValue({ records: rows, columnMetadata: [] });

    const top = await (dbService as any).getTopUsers(2);
    expect(Array.isArray(top)).toBe(true);
    expect(top[0]).toHaveProperty('displayname', 'A');
  });
});
