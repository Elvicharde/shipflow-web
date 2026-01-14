import axios from '../app/api/client';

export async function register(username: string, password: string) {
  const res = await axios.post('/auth/register/', { username, password });
  return res.data;
}

export async function login(username: string, password: string) {
  const res = await axios.post('/auth/login/', { username, password });
  return res.data; // { user_id, token }
}
