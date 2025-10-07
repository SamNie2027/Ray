export class OrgService {
  async getOrgs(limit: number) {
    // TODO: Fetch org list from DB, respect pagination/limit
    // e.g. return await db.orgs.findMany({ take: limit, orderBy: { name: 'asc' } });
    return Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      name: `Org ${i + 1}`
    }));
  }

  async getSpecificOrg(orgId: number) {
    // TODO: Query DB for specific org by id
    // e.g. return await db.orgs.findUnique({ where: { id: orgId } });
    return { id: orgId, name: `Org ${orgId}` };
  }
}

export const orgService = new OrgService();
