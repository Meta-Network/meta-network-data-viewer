import { useCallback, useContext, useEffect, useState } from 'react';
import { MetadataPlatform, PlatformIdName, PlatformSourceName } from '../utils/types';
import {
  BaseSignatureMetadata, AuthorDigestMetadata, BatchGridActionsMetadata,
  metaNetworkGridsServerSign, serverVerificationSign, AuthorMediaSignatureMetadata,
  authorMediaSign
} from '@metaio/meta-signature-util';
import { MetadataType } from '../utils/types'
import dynamic from 'next/dynamic';
import axios from 'axios';
import renderHTML from 'react-render-html';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerValidations from './CustomerValidations';
import { getArweaveBlockByHash, getArweaveTxnStatusByHash } from '../services/arweave';
import ShowItem from './ShowItem';
import DataSourceContext from '../utils/dataSource';
import ViewerFooter from './ViewerFooter';
import { getCidTimeInfo, IPFSCidTimeInfoMappingContractAddress, chainInfo, getTxnHashByCidAndBlockNumberFromRPC } from '../services/IPFSCidTimeInfoMapping';

const md = require('markdown-it')().use(require('markdown-it-plantuml'));

interface IDataViewerProps {
  options: {
    platform: MetadataPlatform,
    id: string,
    idName: PlatformIdName,
    dataSourceName: PlatformSourceName,
    dataSourceList: string[],
    defaultDataSource?: string,
    defaultDataContent?: any,
    timeout?: number,
    isTest?: boolean,
  }
}

interface IReference {
  refer: string;
  rel: string;
  body: BaseSignatureMetadata | AuthorDigestMetadata;
}

function DataViewer<TMetadataType>(props: IDataViewerProps) {

  const { options } = props;

  const [id, setId] = useState('');
  const [dataSource, setDataSource] = useState('');
  const [verifyServerMetadataSignatureStatus, setVerifyServerMetadataSignatureStatus] = useState(false);
  const [metadata, setMetadata] = useState<TMetadataType | MetadataType>({ status: 'fetching...' } as any);
  const [blockNumber, setBlockNumber] = useState<Number>(null);
  const [blockTimestamp, setBlockTimestamp] = useState<number>(0);
  const [remark, setRemark] = useState({});
  const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false })

  const getMetadata = useCallback(async () => {
    try {

      let requestResult: any;
      let content: any
      let verifyStatus: boolean = false;
      if (true) {
        content = { "@context": "https://metanetwork.online/ns/grid", "@type": "meta-network-grids-server-sign", "@version": "1.0.0", "signatureAlgorithm": "curve25519", "publicKey": "0xbada4a41bc2f9a5629f22cf8660eb3bfb766713e10d4ba81a0082c327a38d857", "items": [{ "userId": 473, "subdomain": "team.metaspaces.me", "metaSpaceSiteId": 52, "metaSpaceSiteUrl": "https://team.metaspaces.me", "id": 461, "previousTx": "DqJEsYZxn0ZrW6U-2pI2EWs4PgdJw0zfxRI9GHGPAKA" }], "nonce": "0x6fbf493c195bc6e7261c472a", "claim": "I, metanetwork.online maintain grids for users, using the key: 0xbada4a41bc2f9a5629f22cf8660eb3bfb766713e10d4ba81a0082c327a38d857", "digest": "0xb28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21", "signature": "0x8e0b8eb201c8617166bec26ba8b2086f9b253208ec156ad98be0506c1199412a97c4a2cf67292790b7dfa9c0e5b992aed6631d63b992498205965a61416d6486", "ts": 1640174400293, "previousBatchTx": "3mSGg3chcVI5m42ruHHYdUhfAFN1RZxMMVyOOsbtsSg" }
      } else {
        requestResult = await axios.get(`${dataSource.replace(':hash', id)}`, { timeout: options.timeout || 1000 });
        content = await (requestResult).data;
      }

      if ((content as BatchGridActionsMetadata)['@type'] === 'meta-network-grids-server-sign') {
        console.log('Verify Meta Network grids');
        verifyStatus = metaNetworkGridsServerSign.verify(content as BatchGridActionsMetadata);
      } else if ((content as AuthorMediaSignatureMetadata)['@type'] === 'author-media-sign') {
        verifyStatus = authorMediaSign.verify(content as AuthorMediaSignatureMetadata);
      } else {
        console.log('Server Verification Sign.');
        verifyStatus = serverVerificationSign.verify(content as BaseSignatureMetadata);
      }
      console.log('verify result:', verifyStatus);
      setVerifyServerMetadataSignatureStatus(verifyStatus);
      setMetadata(content);
      // verifyStatus ? setMetadata(content) : toast.warning('Verify server metadata signature failure!');
    } catch (error) {
      if (error.message.includes('Network Error')) {
        toast.error('Please check your connection');
      } else {
        console.error(error)
        toast.error('Something went wrong');
      }
      setMetadata({ status: 'failure.' } as any)
    }
  }, [id, dataSource, options]);

  const getArweaveTxnStatus = useCallback(async () => {
    if (!options.id) return;
    const { block_height, block_indep_hash } = await getArweaveTxnStatusByHash(options.id);
    const { timestamp } = await getArweaveBlockByHash(block_indep_hash);
    setBlockNumber(block_height);
    setBlockTimestamp(timestamp * 1000);
  }, [options.id, setBlockNumber, setBlockTimestamp]);

  const getIPFSTimeInfo = useCallback(async () => {

    if (!options.id) return;
    try {
      const { timestamp, blockNumber } = await getCidTimeInfo(options.id);
      setBlockNumber(Number(blockNumber));
      setBlockTimestamp(Number(timestamp) * 1000);
      const hash = await getTxnHashByCidAndBlockNumberFromRPC(options.id, Number(blockNumber));

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
      console.log(error);
    }
  }, [options.id, setBlockNumber, setBlockTimestamp, setRemark]);

  useEffect(() => {
    (id && dataSource) ? getMetadata() : null;
  }, [id, dataSource, getMetadata]);

  useEffect(() => {
    setId(options.id);
    setDataSource((options.defaultDataSource) || options.dataSourceList[0]);
    if (options.isTest) return;
    if (options.platform === 'arweave') {
      getArweaveTxnStatus();
    }

    if (options.platform === 'ipfs') {
      getIPFSTimeInfo();
    }

  }, [options, getArweaveTxnStatus, getIPFSTimeInfo]);

  // const renderData = (content: string) => content.replaceAll('```plantuml\n@startuml', '\n@startuml').replaceAll('@enduml\n```', '@enduml\n');

  return <>
    <DataSourceContext.Provider value={{ platform: props.options.platform, source: dataSource }}>
      <ToastContainer />
      <main className="mx-auto max-w-6xl p-4">
        <div className="w-full  flex flex-col md:flex-row md:space-x-2 ">
          <div className="w-full md:w-2/3 my-2">
            <h2 className="font-thin text-2xl text-purple-700">{options.idName}</h2>
            <div className="w-full flex flex-col justify-center font-thin text-xs text-purple-700 bg-purple-100 px-2 rounded border border-purple-300 placeholder-purple-200 h-10 ">
              {id}
            </div>
          </div>
          <div className="w-full md:w-1/3 my-2">
            <h2 className="font-thin text-2xl text-purple-700">Select {options.dataSourceName}.</h2>
            <select value={dataSource} onChange={(e) => { setDataSource(e.target.value) }}
              className="w-full font-thin p-2 rounded border text-purple-700 border-purple-300 placeholder-purple-200 h-10">
              {options.dataSourceList.map((item: string, index) => {
                return <option key={index} value={item}>{item.replace(':hash', '')}</option>
              })}
            </select>
          </div>
        </div>
        <div className="my-2 mt-8 w-full flex flex-col md:flex-row md:space-x-2">
          <div className="w-full md:w-2/3 my-2">
            <h2 className="font-thin text-2xl text-purple-700">Origin Metadata</h2>
            <div className="p-2 border border-purple-300 rounded mt-2 bg-purple-50">
              <div className="overflow-auto ">
                <DynamicReactJson src={metadata as BaseSignatureMetadata} displayDataTypes={false} defaultValue={{ ok: false }} name={false} />
              </div>

            </div>
          </div>
          {
            (metadata as any).status == 'fetching...' ? <></> : <div className="w-full md:w-1/3 my-2">
              <div>
                {
                  (metadata as any).status == 'fetching...' ? <></> :
                    <div> { /* init */}
                      <h2 className="font-thin text-2xl text-purple-700">Server metadata</h2>
                      {
                        verifyServerMetadataSignatureStatus ? <div className="my-2 p-4 animate-pulse bg-green-600 text-white rounded">
                          Verify server metadata signature success.
                        </div> : <div className="my-2 p-4 animate-pulse bg-red-600 text-white rounded">
                          Verify server metadata signature failure.
                        </div>
                      }
                    </div>
                }
                {
                  options.platform == 'arweave' && blockNumber > 0 ? <div className="mt-8">
                    <h2 className="font-thin text-2xl text-purple-700">Arweave</h2>
                    <ShowItem
                      title="Block"
                      content={blockNumber.toString()}
                      url={`https://viewblock.io/arweave/block/${blockNumber}`}
                      urlTitle="viewblock.io"
                    />
                    <ShowItem
                      title="Timestamp"
                      content={new Date(blockTimestamp).toLocaleString()}
                    />
                  </div> : <></>
                }
                {
                  options.platform == 'ipfs' && blockNumber > 0 ? <div className="mt-8">
                    <h2 className="font-thin text-2xl text-purple-700">Time information</h2>
                    <ShowItem
                      title="Block"
                      content={blockNumber.toString()}
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
                  </div> : (options.platform == 'ipfs' && blockNumber === 0 ? <div className="mt-8">
                    <h2 className="font-thin text-2xl text-purple-700">Time information</h2>
                    <ShowItem
                      title="Time infomation"
                      content={'not found, no result'}
                    />
                  </div> : options.platform == 'ipfs' ? <div className="text-xs font-thin text-purple-500 animate-pulse mt-4">Query CID time infomation...</div> : <></>)
                }


              </div>
              <div className="break-all">
                {
                  /**
                   * show validations component for customers.
                   */
                  (verifyServerMetadataSignatureStatus) ? <>
                    <CustomerValidations metadata={metadata as MetadataType} />
                  </> : <></>
                }
              </div>
            </div>
          }

        </div>
        <div>
          {
            /**
             * show the post content.
             */
            (verifyServerMetadataSignatureStatus && (metadata as BaseSignatureMetadata).reference) ? <>
              <h2 className="font-thin text-sm text-purple-700" >Post Content</h2>
              {
                (metadata as BaseSignatureMetadata).reference.map((item: IReference, index) => {
                  const body = item.body as AuthorDigestMetadata;
                  if (body.title && body.content) {
                    return <div key={index}>
                      <div className=" shadow-inner border rounded border-purple-300 mt-2 p-4">
                        <h2 className="my-2 text-2xl">{body.title}</h2>
                        <div className="prose">
                          {
                            renderHTML(md.render((body.content)))
                          }
                        </div>
                      </div>
                    </div>
                  } else {
                    return <div key={index} className="font-thin text-xs text-purple-700"></div>
                  }
                })
              }
            </> : <></>
          }

        </div>
        <ViewerFooter />
      </main>
    </DataSourceContext.Provider>
  </>;
}

export default DataViewer;