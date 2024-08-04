export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'system';
}