export interface Profile {
    id: string;
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isPrivate: boolean;
    education: [];
    skills: [];
}