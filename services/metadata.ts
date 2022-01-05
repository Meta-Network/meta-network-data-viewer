import axios from 'axios';

export const getMetadata = async (dataSource: string, id: string, timeout?: number) => {
  const result = await axios.get(`${dataSource.replace(':hash', id)}`, { timeout: timeout || 1000 });
  return await (result).data;
}