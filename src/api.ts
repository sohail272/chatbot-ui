import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chatwidget-api.netlify.app/',
});

let token = '';

export const login = async (username: string, password: string) => {
  const response = await api.post('/token', new URLSearchParams({ username, password }));
  token = response.data.access_token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const fetchMessages = () => api.get('/messages/');
export const sendMessage = (content: string) => api.post('/messages/', { content });
export const deleteMessage = (id: number) => api.delete(`/messages/${id}`);
export const updateMessage = (id: number, content: string) => api.put(`/messages/${id}`, { content });
