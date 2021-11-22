import axios from "axios";

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