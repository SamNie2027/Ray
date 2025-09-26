export class OrgService {
  async getOrgs(limit: number) {
    return Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      name: `Org ${i + 1}`
    }));
  }

  async getSpecificOrg(orgId: number) {
    return { id: orgId, name: `Org ${orgId}` };
  }
}

export const orgService = new OrgService();
