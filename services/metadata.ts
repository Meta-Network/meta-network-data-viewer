import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export const getMetadata = async (dataSource: string, id: string, timeout?: number) => {
  const result = await axios.get(`${dataSource.replace(':hash', id)}`, { timeout: timeout || 1000 });
  return await (result).data;
}

export const useMetadata = (source: string, id: string, timeout?: number) => {
  const { data, error } = useSWR(`${source.replace(':hash', encodeURIComponent(id))}`, fetcher, { loadingTimeout: timeout || 5000 })
  return {
    metadata: data,
    isLoading: !error && !data,
    isError: error,
  }
}