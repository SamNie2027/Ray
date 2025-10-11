export const getLeaderboard = async () => {
  try {
    const response = await fetch('/leaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export const getUserStreak = async (userId) => {
  try {
    const response = await fetch(`/users/${userId}/streak`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user streak');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user streak:', error);
    throw error;
  }
};
