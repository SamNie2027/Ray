import { dbService } from './db.service';

export class OrgService {
  async getOrgs(limit: number) {
    const rows = await dbService.getOrgs(limit || 10);
    return rows;
  }

  async getSpecificOrg(orgId: number) {
    const org = await dbService.getOrgById(orgId);
    return org;
  }
}

export const orgService = new OrgService();
