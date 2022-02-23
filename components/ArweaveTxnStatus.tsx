import { ShowItem } from './PageElements';
import { useState } from 'react';
import { useGetArweaveTxnStatusByHash, useGetArweaveBlockByHash } from '../services'

type ArweaveTxnStatusProps = {
  hash: string
}

type ArweaveTimestampProps = {
  block_indep_hash: string
}

/**
 * Struct:
 * <ArweaveTxnStatus>
 *  <ArweaveTimestamp/>
 * </ArweaveTxnStatus>
 */

const ArweaveTimestamp = (props: ArweaveTimestampProps) => {

  const arweaveBlockResult = useGetArweaveBlockByHash(props.block_indep_hash);

  if (arweaveBlockResult.isLoading) return <ShowItem
    title="Timestamp"
    content={"loading ...."}
  />

  if (arweaveBlockResult?.arweaveBlock?.timestamp) {

    console.log(`!!!`, arweaveBlockResult.arweaveBlock.timestamp);
    return <>
      <ShowItem
        title="Timestamp"
        content={new Date(arweaveBlockResult.arweaveBlock.timestamp * 1000).toLocaleString()}
      /> </>;
  } else {
    return <></>;
  }
}

const ArweaveTxnStatus = (props: ArweaveTxnStatusProps) => {

  const { hash } = props;

  const arweaveTxnStatusResult = useGetArweaveTxnStatusByHash(hash);

  if (arweaveTxnStatusResult.isError) return <></>;

  if (arweaveTxnStatusResult.isLoading) return <>
    <h2 className="font-thin text-2xl text-purple-700">Arweave</h2>
    <ShowItem
      title="Block"
      content={"loading ...."}
    /></>;

  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Arweave</h2>

    {
      arweaveTxnStatusResult.arweaveStatus?.block_height ? <ShowItem
        title="Block"
        content={arweaveTxnStatusResult.arweaveStatus?.block_height?.toString()}
        url={`https://viewblock.io/arweave/block/${arweaveTxnStatusResult.arweaveStatus.block_height}`}
        urlTitle="viewblock.io"
      /> : <></>
    }

    {
      arweaveTxnStatusResult?.arweaveStatus?.block_indep_hash ?
        <ArweaveTimestamp block_indep_hash={arweaveTxnStatusResult.arweaveStatus.block_indep_hash} /> :
        <></>
    }
  </div >
}

export default ArweaveTxnStatus;