import client from './client';

export const get = async <T>(url: string) => {
  const res = await client.get<T>(url);
  return res.data;
};

export const post = async <T>(url: string, body?: any, config?: any) => {
  const res = await client.post<T>(url, body, config);
  return res.data;
};

export const patch = async <T>(url: string, body?: any) => {
  const res = await client.patch<T>(url, body);
  return res.data;
};
export const del = async <T>(url: string) => {
  const res = await client.delete<T>(url);
  return res.data;
};
export const put = async <T>(url: string, body?: any) => {
  const res = await client.put<T>(url, body);
  return res.data;
};
