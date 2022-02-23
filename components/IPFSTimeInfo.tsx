import { useState, useEffect, useCallback } from 'react';
import { ShowItem } from './PageElements';
import { getCidTimeInfo, IPFSCidTimeInfoMappingContractAddress, chainInfo, getTxnHashByCidAndBlockNumberFromRPC } from '../services';

type IPFSTimeInfoProps = {
  ipfsHash: string,
  platform: string,
}

const IPFSTimeInfo = (props: IPFSTimeInfoProps) => {

  const { ipfsHash, platform } = props;

  const [block, setBlock] = useState(null);
  const [blockTimestamp, setBlockTimestamp] = useState(null);
  const [remark, setRemark] = useState({});

  const getIPFSTimeInfo = useCallback(async () => {
    if (!ipfsHash) return;
    try {
      const { timestamp, blockNumber } = await getCidTimeInfo(ipfsHash);
      console.log('getIPFSTimeInfo::', timestamp, blockNumber);
      setBlock(Number(blockNumber));
      setBlockTimestamp(Number(timestamp) * 1000);
      const hash = await getTxnHashByCidAndBlockNumberFromRPC(ipfsHash, Number(blockNumber));
      console.log(hash);
      setRemark({
        hash: {
          title: "Txn hash",
          content: hash,
          url: `${chainInfo.scan}tx/${hash}`,
          urlTitle: `${chainInfo.name} explorer`,
          type: 'time'
        }
      });
    } catch (error) {
      console.log(`get IPFS timeinfo failure.`);
      console.log(error);
    }
  }, [ipfsHash, setBlock, setBlockTimestamp, setRemark]);

  useEffect(() => {
    if (platform === 'ipfs') {
      getIPFSTimeInfo();
    }
  }, [getIPFSTimeInfo, platform]);

  return <>
    {
      platform == 'ipfs' && block > 0 ? <div className="mt-8">
        <h2 className="font-thin text-2xl text-purple-700">Time information</h2>
        <ShowItem
          title="Block"
          content={block.toString()}
        />
        <ShowItem
          title="Timestamp"
          content={new Date(blockTimestamp).toLocaleString()}
        />
        <ShowItem
          title="Contract"
          content={IPFSCidTimeInfoMappingContractAddress}
          url={`${chainInfo.scan}address/${IPFSCidTimeInfoMappingContractAddress}`}
          urlTitle={`${chainInfo.name} explorer`}
        />
        {
          remark && (remark as any).hash ? <ShowItem
            title="Txn hash"
            content={(remark as any).hash.content}
            url={(remark as any).hash.url}
            urlTitle={(remark as any).hash.urlTitle}
          /> : <></>
        }
      </div> : (platform == 'ipfs' && block === 0 ? <div className="mt-8">
        <h2 className="font-thin text-2xl text-purple-700">Time information</h2>
        <ShowItem
          title="Time infomation not found."
          content={'No deposited information found.'}
        />
      </div> : platform == 'ipfs' ? <div className="mt-8">
        <h2 className="font-thin text-2xl text-purple-700">Time information</h2>
        <div className="text-xs font-thin text-purple-500 animate-pulse mt-4">Query CID time infomation...</div>
      </div> : <></>)
    }
  </>;
}

export default IPFSTimeInfo;