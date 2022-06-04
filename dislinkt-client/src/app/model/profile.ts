import { Education } from "./education";
import { Experience } from "./experience";

export interface Profile {
    id: string;
    name: string;
    lastName: string;
    email: string;
    username: string;
    biography: string;
    isPrivate: boolean;
    education: Education[];
    skills: string[];
    interests: string[];
    experience: Experience[];
}