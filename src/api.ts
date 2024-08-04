// src/api/index.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust based on your setup

export const fetchMessages = () => axios.get(`${API_URL}/messages/`);

export const sendMessage = (content: string) =>
  axios.post(`${API_URL}/messages/`, { content });

export const deleteMessage = (id: number) =>
  axios.delete(`${API_URL}/messages/${id}`);

export const chatbotRespond = (content: string) =>
  axios.post(`${API_URL}/chatbot/respond`, { content });
