import { OrgService } from '../src/services/org.service';
import { dbService } from '../src/services/db.service';

describe('OrgService', () => {
  afterEach(() => jest.restoreAllMocks());

  test('getOrgs returns list of orgs', async () => {
    const svc = new OrgService();
    const mocked = [{ org_id: 1, name: 'Org1' }, { org_id: 2, name: 'Org2' }];
    jest.spyOn(dbService, 'getOrgs').mockResolvedValue(mocked as any);

    const out = await svc.getOrgs(5);
    expect(out).toEqual(mocked);
  });

  test('getSpecificOrg returns single org or null', async () => {
    const svc = new OrgService();
    jest.spyOn(dbService, 'getOrgById').mockResolvedValue({ org_id: 7, name: 'Special' } as any);

    const out = await svc.getSpecificOrg(7);
    expect(out).toHaveProperty('org_id', 7);
  });
});
