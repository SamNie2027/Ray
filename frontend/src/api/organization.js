export const getOrganizations = async (limit = 10) => {
  try {
    const response = await fetch(`/orgs?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

export const getOrganizationById = async (orgId) => {
  try {
    const response = await fetch(`/orgs/${orgId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Organization not found');
      }
      throw new Error('Failed to fetch organization');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
};
