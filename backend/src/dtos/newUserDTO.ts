export const givingLocationPrefTypes = ['online', 'in_person', 'both'] as const;
export type GivingLocationPrefType = typeof givingLocationPrefTypes[number];

export type NewUserInput = {
    name: string;
    email: string;
    password: string;
    username?: string;
    giving_location_pref: GivingLocationPrefType;
}
