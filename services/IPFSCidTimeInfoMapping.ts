import IPFSCidTimeInfoMapping from '../ethereum/ABI/IPFSCidTimeInfoMapping.json';
import { ethers } from 'ethers';
import axios from 'axios';

/**
 * ENV
 * 
 * NEXT_PUBLIC_ETH_RPC
 * NEXT_PUBLIC_ETH_NETWORK
 * NEXT_PUBLIC_ETH_CHAIN_ID
 * NEXT_PUBLIC_MAPPING_CONTRACT
 * NEXT_PUBLIC_SCAN
 */

export const chainInfo = {
  rpc: process.env.NEXT_PUBLIC_ETH_RPC || 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  name: process.env.NEXT_PUBLIC_ETH_NETWORK || 'rinkeby',
  chainId: Number(process.env.NEXT_PUBLIC_ETH_CHAIN_ID) > 0 ? Number(process.env.NEXT_PUBLIC_ETH_CHAIN_ID) : 4,
  scan: process.env.NEXT_PUBLIC_SCAN || 'https://rinkeby.etherscan.io/',
  scanKey: process.env.NEXT_PUBLIC_SCAN_KEY || 'AQY5H5KFY1MIPKGEZ1S7V8H4I267MMNQEH',
  scanApi: process.env.NEXT_PUBLIC_SCAN_API || 'https://api-rinkeby.etherscan.io/api',
}

export const IPFSCidTimeInfoMappingContractAddress = process.env.NEXT_PUBLIC_MAPPING_CONTRACT || '0x026b243892dd9cdda1b1689a65870f400a8be3b6';

const provider = new ethers.providers.JsonRpcProvider(chainInfo.rpc, {
  name: chainInfo.name,
  chainId: Number(chainInfo.chainId),
})

export const contract = new ethers.Contract(IPFSCidTimeInfoMappingContractAddress, IPFSCidTimeInfoMapping, provider);

export const getCidTimeInfo = async (cid: string) => {
  const cidTimeInfo = await contract.cidTimeInfoMapping(cid);
  const { timestamp, blockNumber } = cidTimeInfo;
  return {
    timestamp: ethers.utils.formatUnits(timestamp, 0),
    blockNumber: ethers.utils.formatUnits(blockNumber, 0)
  }
}

/*
{
  "status": "1",
  "message": "OK",
  "result": [
    {
      "address": "0x026b243892dd9cdda1b1689a65870f400a8be3b6",
      "topics": [
        "0x57c32ead761b650c0f98e2b39c4192111cf6f8a7608576423edece87f5481913"
      ],
      "data": "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002e516d64564347624d474d536571473856327743364d6358526556687143744b776d425a676b64436f504d576b3179000000000000000000000000000000000000",
      "blockNumber": "0x966ae0",
      "timeStamp": "0x61c2dfca",
      "gasPrice": "0x9502f909",
      "gasUsed": "0x11aa6",
      "logIndex": "0x4",
      "transactionHash": "0xd9f4a8b9a771efe0144608b32718fffd12fb5030620a1cca29dda3512d5c0b5e",
      "transactionIndex": "0x6"
    }
  ]
}
*/

export const getTxnHashByCidAndBlockNumberFromScan = async (cid: string, blockNumber: string) => {

}

export const getTxnHashByCidAndBlockNumberFromRPC = async (cid: string, blockNumber: number) => {
  // const filterCid = contract.filters.TimeInfoSaved(cid);
  const logs = await contract.queryFilter({}, blockNumber, blockNumber);
  const logsByCid = logs.filter(log => {
    return log.args.cid === cid;
  });

  return (await (await logsByCid[0].getTransaction()).hash);
}