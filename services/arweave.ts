import axios from "axios";

export type ArweaveTxnStatus = {
  block_height: number
  block_indep_hash: string
  number_of_confirmations: number
}


export const getArweaveTxnStatusByHash = async (hash: string, src?: string): Promise<ArweaveTxnStatus> =>
  await (await axios.get(`https://arweave.net/tx/${encodeURIComponent(hash)}/status`)).data;