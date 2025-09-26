import { GivingLocationPrefType } from "./newUserDTO";

export type userOutput = {
    name: string;
    email: string;
    password: string;
    username?: string;
    giving_location_pref: GivingLocationPrefType;
    daily_streak: number;
    orgs_given_before: number[];
}
