export interface Post {
    id: string;
    userId: string;
    text: string;
    picture: string;
    links: string[];
    numberOfComments: number;
    numberOfLikes: number;
}