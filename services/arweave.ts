import axios from "axios";

import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export type ArweaveTxnStatus = {
  block_height: number
  block_indep_hash: string
  number_of_confirmations: number
}

export interface ArweaveBlock {
  timestamp: number
}

export const getArweaveTxnStatusByHash = async (hash: string, src?: string): Promise<ArweaveTxnStatus> =>
  await (await axios.get(`https://arweave.net/tx/${encodeURIComponent(hash)}/status`)).data;

export const getArweaveBlockByHash = async (hash: string) =>
  (await axios.get<ArweaveBlock>(`https://arweave.net/block/hash/${encodeURIComponent(hash)}`)).data;

export const useGetArweaveTxnStatusByHash = (hash: string, timeout?: number) => {
  const { data, error } = useSWR(`https://arweave.net/tx/${encodeURIComponent(hash)}/status`,
    fetcher, {
    loadingTimeout: timeout || 5000
  });

  console.log(`useGetArweaveTxnStatusByHash`, data);

  return {
    arweaveStatus: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGetArweaveBlockByHash = (hash: string, timeout?: number) => {
  const { data, error } = useSWR(`https://arweave.net/block/hash/${encodeURIComponent(hash)}`,
    fetcher, {
    loadingTimeout: timeout || 5000
  });


  console.log(`useGetArweaveBlockByHash`, data);

  return {
    arweaveBlock: data,
    isLoading: !error && !data,
    isError: error,
  }
}