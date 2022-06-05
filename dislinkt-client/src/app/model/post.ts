import { Profile } from "./profile";
import { Reaction } from "./reaction";

export interface Post {
    id: string;
    userId: string;
    text: string;
    picture: string;
    links: string[];
    comments: Comment[];
    reactions: Reaction[];
    profile: Profile;
    numberOfComments: number;
    numberOfReactions: number;
}