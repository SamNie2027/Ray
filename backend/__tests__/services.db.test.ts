import { dbService } from '../src/services/db.service';

describe('DBService (light)', () => {
  afterEach(() => jest.restoreAllMocks());

  test('getUserByEmail returns mapped user or null', async () => {
    const fakeRow = { id: 11, name: 'Zed', email: 'zed@x.com', password: 'p', username: 'zed', giving_location_pref: 'online', daily_streak: 2, orgs_given_before: JSON.stringify([1,2]) };
    jest.spyOn(dbService as any, 'executeSql').mockResolvedValue({ records: [fakeRow], columnMetadata: [] });

    const out = await (dbService as any).getUserByEmail('zed@x.com');
    expect(out).toHaveProperty('id', 11);
    expect(out).toHaveProperty('orgs_given_before');
    expect(Array.isArray(out.orgs_given_before)).toBe(true);
  });

  test('getOrgs returns mapped orgs', async () => {
    const fakeOrg = { org_id: 99, name: 'Help' };
    jest.spyOn(dbService as any, 'executeSql').mockResolvedValue({ records: [fakeOrg], columnMetadata: [] });

    const out = await (dbService as any).getOrgs(1);
    expect(out[0]).toHaveProperty('org_id', 99);
  });
});
