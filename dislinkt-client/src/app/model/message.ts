export interface Message {
    id: string;
    text: string;
    date: Date;
    seen: boolean;
    senderUsername: string;
    senderId: string;
    receiverUsername: string;
    receiverId: string;
}