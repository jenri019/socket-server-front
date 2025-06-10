export interface Message {
    from: string;
    body: string;
    to?: string; // Optional, used for private messages
}
