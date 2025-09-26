export type leaderboardEntry = {
    displayname: string;
    streak: number;
}

export type leaderboardOutput = {
    leaderboard: leaderboardEntry[];
}