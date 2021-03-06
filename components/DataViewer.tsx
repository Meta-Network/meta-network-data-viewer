import { useCallback, useEffect, useState, useContext } from 'react';
import { MetadataPlatform, PlatformIdName, PlatformSourceName } from '../utils/types';
import initMetaSignatureUtil, {
  MetadataVersion,
  BaseSignatureMetadata, AuthorDigestMetadata, BatchGridActionsMetadata, AuthorMediaSignatureMetadata,
} from '../utils/metaSignature';
import { MetadataType } from '../utils/types'
import dynamic from 'next/dynamic';
import renderHTML from 'react-render-html';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerValidations from './CustomerValidations';
import { ShowItem } from './PageElements';
import DataSourceContext from '../utils/dataSource';
import testPayloads from '../utils/testPayloads.json';
import { useMetadata } from '../services/metadata';
import ArweaveTxnStatus from './ArweaveTxnStatus';
import IPFSTimeInfo from './IPFSTimeInfo';
import { data } from 'msw/lib/types/context';

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
  const [id, setId] = useState<string>(options.id);
  const [dataSource, setDataSource] = useState<string>((options.defaultDataSource) || options.dataSourceList[0]);
  const [verifyServerMetadataSignatureStatus, setVerifyServerMetadataSignatureStatus] = useState(false);
  const [metadata, setMetadata] = useState<TMetadataType | MetadataType>({ status: 'fetching...' } as any);
  const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false });

  let metadataResult = useMetadata(dataSource, options.id, options.timeout || 1000);

  const getMetadata = useCallback(async () => {
    try {
      let content: any
      let verifyStatus: boolean = false;
      if (options.isTest) {
        content = testPayloads;
        verifyStatus = true;
      } else {
        content = metadataResult.metadata;
        if (typeof content === 'undefined') return;
        const metaDataVersion = Number(content['@version']?.split('.')[0]) >= 2 ? 2 : 1;
        const { metaNetworkGridsServerSign,
          serverVerificationSign, authorMediaSign } = initMetaSignatureUtil(metaDataVersion);
        if ((content as BatchGridActionsMetadata)['@type'] === 'meta-network-grids-server-sign') {
          console.log('Verify Meta Network grids');
          verifyStatus = metaNetworkGridsServerSign.verify(content as BatchGridActionsMetadata);
        } else if ((content as AuthorMediaSignatureMetadata)['@type'] === 'author-media-sign') {
          verifyStatus = authorMediaSign.verify(content as AuthorMediaSignatureMetadata);
        } else {
          console.log('Server Verification Sign.');
          verifyStatus = serverVerificationSign.verify(content as BaseSignatureMetadata);
        }
      }

      console.log('verify result:', verifyStatus);
      setVerifyServerMetadataSignatureStatus(verifyStatus);
      setMetadata(content);
      // verifyStatus ? setMetadata(content) : toast.warning('Verify server metadata signature failure!');
    } catch (error) {
      if (!options.isTest) {
        if (error.message.includes('Network Error')) {
          toast.error('Please check your connection');
        } else {
          console.error('getMetadata', error);
        }
      }
      setMetadata({ status: 'failure.' } as any)
    }
  }, [options.isTest, metadataResult]);

  // const getArweaveTxnStatus = useCallback(async () => {
  //   if (!options.id) return;
  //   const { block_height, block_indep_hash } = await getArweaveTxnStatusByHash(options.id);
  //   const { timestamp } = await getArweaveBlockByHash(block_indep_hash);
  //   console.log(block_height, block_indep_hash, timestamp);
  //   setBlockNumber(block_height);
  //   setBlockTimestamp(timestamp * 1000);
  // }, [options.id, setBlockNumber, setBlockTimestamp]);

  // const getIPFSTimeInfo = useCallback(async () => {
  //   if (!options.id) return;
  //   try {
  //     const { timestamp, blockNumber } = await getCidTimeInfo(options.id);
  //     setBlockNumber(Number(blockNumber));
  //     setBlockTimestamp(Number(timestamp) * 1000);
  //     const hash = await getTxnHashByCidAndBlockNumberFromRPC(options.id, Number(blockNumber));
  //     console.log(hash);
  //     setRemark({
  //       hash: {
  //         title: "Txn hash",
  //         content: hash,
  //         url: `${chainInfo.scan}tx/${hash}`,
  //         urlTitle: `${chainInfo.name} explorer`,
  //         type: 'time'
  //       }
  //     });
  //   } catch (error) {
  //     console.log(`get IPFS timeinfo failure.`);
  //     // console.log(error);
  //   }
  // }, [options.id, setBlockNumber, setBlockTimestamp, setRemark]);

  useEffect(() => {
    (id && dataSource) ? getMetadata() : null;
  }, [id, dataSource, getMetadata]);

  useEffect(() => {
    setId(options.id);
    setDataSource((options.defaultDataSource) || options.dataSourceList[0]);
    if (options.isTest) return;

    try {
      if (options.platform === 'arweave') {
        // TODO SWITCH TO SWR
        // getArweaveTxnStatus();
      }
      if (options.platform === 'ipfs') {
        // TODO SWITCH TO SWR
        // getIPFSTimeInfo();
      }
    } catch (error) {
      if (metadataResult.isError) {

      } else {
        console.log(`[x]Get chain info error`);
        console.log(error);
      }
    }


  }, [options, metadataResult.isError]);

  useEffect(() => {
    console.log(`Metadata version: ${metadata['@version']}`);
  }, [metadata]);

  // if (metadata?.status == 'fetching...') {
  if (metadataResult.isLoading) {
    return <div className='flex flex-row justify-center items-center h-screen bg-purple-500' style={{
      visibility: 'visible',
      opacity: 1,
      transition: '.3s'
    }}>
      <div className=' border border-purple-50 p-5 animate-pulse rounded-sm w-80'>
        <p className='text-purple-50 font-thin text-xs  break-words mr-16'>Resource: {id} </p>
        <p className='text-purple-50 font-thin text-xs  break-words mr-16 mt-2'>From: {props.options.dataSourceName} </p>

        <div className='flex flex-row justify-between items-end mt-12'>
          <p className='text-purple-50 font-thin text-2xl text-center mt-4'> LOADING</p>

          <div className='flex flex-row justify-center items-center  animate-spin'>
            <svg width="60" height="60" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 0.721688L28.9724 8.64434C29.1271 8.73365 29.2224 8.89872 29.2224 9.07735V24.9226C29.2224 25.1013 29.1271 25.2663 28.9724 25.3557L15.25 33.2783C15.0953 33.3676 14.9047 33.3676 14.75 33.2783L1.02757 25.3557C0.872867 25.2663 0.777568 25.1013 0.777568 24.9226V9.07735C0.777568 8.89872 0.872867 8.73365 1.02757 8.64434L14.75 0.721688C14.9047 0.632371 15.0953 0.632371 15.25 0.721688Z" stroke="white" />
              <circle cx="15" cy="17" r="7.5" stroke="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  }

  // if (metadata?.status == 'failure.') {
  if (metadataResult.isError) {

    if (options.platform === 'ipfs' && (typeof options.dataSourceList != 'string')) {
      const dataSourceKey = options.dataSourceList.indexOf(dataSource);
      if (dataSourceKey > -1) {
        if (dataSourceKey == options.dataSourceList.length - 1) {
          setDataSource(options.dataSourceList[0]);
        } else {
          setDataSource(options.dataSourceList[dataSourceKey + 1]);
        }
      } else {
        setDataSource(options.dataSourceList[0]);
      }
    }

    return <div className='flex flex-row justify-center items-center h-screen bg-red-800' style={{
      visibility: 'visible',
      opacity: 1,
      transition: '.3s'
    }}>
      <div className=' border border-purple-50 p-5  rounded-sm w-80'>
        <p className='text-purple-50 font-thin text-xs  break-words mr-16'>Resource: {id} </p>
        <p className='text-purple-50 font-thin text-xs  break-words mr-16 mt-2'>From: {props.options.dataSourceName} </p>

        <div className='flex flex-row justify-between items-end mt-12'>
          <p className='text-purple-50 font-thin text-2xl text-center mt-4'> Failure</p>

          <div className='flex flex-row justify-center items-center'>
            <svg width="60" height="60" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 0.721688L28.9724 8.64434C29.1271 8.73365 29.2224 8.89872 29.2224 9.07735V24.9226C29.2224 25.1013 29.1271 25.2663 28.9724 25.3557L15.25 33.2783C15.0953 33.3676 14.9047 33.3676 14.75 33.2783L1.02757 25.3557C0.872867 25.2663 0.777568 25.1013 0.777568 24.9226V9.07735C0.777568 8.89872 0.872867 8.73365 1.02757 8.64434L14.75 0.721688C14.9047 0.632371 15.0953 0.632371 15.25 0.721688Z" stroke="white" />
              <circle cx="15" cy="17" r="7.5" stroke="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  }

  return <div>
    <MetadataVersion.Provider value={{ metadataVersion: metadata['@version'] || metadata['version'] || '1.0.0' }} >
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
              <div className="flex flex-row justify-start">
                <h2 className="font-thin text-2xl text-purple-700">Origin Metadata</h2>

              </div>

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
                    options.platform == 'arweave' && !(metadataResult.isError) ? <ArweaveTxnStatus hash={options.id} /> : <></>
                  }
                  {
                    options.platform == 'ipfs' ? <IPFSTimeInfo ipfsHash={options.id} platform={options.platform} /> : <></>
                  }

                  {
                    <div className="mt-8">
                      <h2 className="font-thin text-2xl text-purple-700">Metadata Info</h2>
                      <MetadataVersion.Consumer>
                        {({ metadataVersion }) => {
                          return <ShowItem
                            title="version"
                            content={metadataVersion}
                          />
                        }}
                      </MetadataVersion.Consumer>
                    </div>
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

        </main>
      </DataSourceContext.Provider>
    </MetadataVersion.Provider>
  </div>;
}

export default DataViewer;