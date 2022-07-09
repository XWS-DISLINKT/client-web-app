export interface Notification {
    id: string;
    content: string;
    receiverId: string;
    notificationType: string;
    date: Date;
    seen: boolean;
}