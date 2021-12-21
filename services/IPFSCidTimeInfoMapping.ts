import IPFSCidTimeInfoMapping from '../ethereum/ABI/IPFSCidTimeInfoMapping.json';
import { ethers } from "ethers";

const rinkebyChian = {
  rpc: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  name: 'rinkeby',
  chainId: 4
}

const provider = new ethers.providers.JsonRpcProvider(rinkebyChian.rpc, {
  name: rinkebyChian.name,
  chainId: Number(rinkebyChian.chainId),
})

export const contract = new ethers.Contract('0x026b243892dd9cdda1b1689a65870f400a8be3b6', IPFSCidTimeInfoMapping, provider);

export const getCidTimeInfo = async (cid: string) => {
  const cidTimeInfo = await contract.cidTimeInfoMapping(cid);
  const { timestamp, blockNumber } = cidTimeInfo;
  return {
    timestamp: ethers.utils.formatUnits(timestamp, 0),
    blockNumber: ethers.utils.formatUnits(blockNumber, 0)
  }
}