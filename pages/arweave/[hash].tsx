
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
const md = require('markdown-it')();
import arweaveNodeList from '../../arweave-node.json'
import renderHTML from 'react-render-html';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as metaSignatureUtil from '@metaio/meta-signature-util';
import { SignatureMetadata, AuthorDigestRequestMetadata } from '@metaio/meta-signature-util/type/types';

import CustomerValidations from '../../components/CustomerValidations';
interface IReference {
  refer: string;
  body: SignatureMetadata & AuthorDigestRequestMetadata;
}

type TypeReference = {
  refer: string;
  body: SignatureMetadata | AuthorDigestRequestMetadata;
}

const Viewer: any = (props) => {

  const propsHash = props.hash;

  const [hash, setHash] = useState('');
  const [arweaveNode, setArweaveNode] = useState('');
  const [verifyServerMetadataSignatureStatus, setVerifyServerMetadataSignatureStatus] = useState(false);
  const [reference, setReference] = useState<TypeReference[]>([]);
  const [metaData, setMetaData] = useState<any>({ status: 'fetching...' })

  const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false })

  const getContent = useCallback(async () => {
    try {
      const content: SignatureMetadata = await (await axios.get(`${arweaveNode.replace(':hash', hash)}`, { timeout: 5000 })).data

      const verifyStatus = metaSignatureUtil.verifyServerMetadataSignature(content);
      setVerifyServerMetadataSignatureStatus(verifyStatus)

      if (verifyStatus) {
        //toast.success('')
        setReference(content.reference)
      } else {
        toast.warning('Verify server metadata signature failure!')
      }
      setMetaData(content)
    } catch (error) {
      if (error.message.includes('Network Error')) {
        toast.error('Please check your internet connection');
      } else {
        console.error(error)
        toast.error('Something went wrong');
      }
      setMetaData({ status: 'failure.' })
    }
  }, [hash, arweaveNode]);

  useEffect(() => {
    if (hash && arweaveNode) {
      getContent();
    }
  }, [hash, arweaveNode, getContent]);

  useEffect(() => {
    setHash(propsHash);
    setArweaveNode('https://arweave.net/:hash');
  }, [hash]);

  if (props.ok) {
    return (
      <div>
        <Head>
          <title>meta-network-data-viewer</title>
          <meta name="description" content="meta-network-data-viewer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <header className=" bg-purple-900">
          <div className="mx-auto max-w-6xl p-4">
            <h1 className="text-2xl font-thin text-white">meta-network-data-viewer</h1>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">
          <div className="w-full  flex flex-col md:flex-row md:space-x-2 ">
            <div className="w-full md:w-2/3 my-2">
              <h2 className="font-thin text-2xl text-purple-700">ID</h2>
              <input type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                disabled={true}
                className="w-full font-thin text-xs text-purple-700 bg-purple-100 p-2 rounded border border-purple-300 placeholder-purple-200 h-10 " placeholder="Please input Arweave txID" />
            </div>
            <div className="w-full md:w-1/3 my-2">
              <h2 className="font-thin text-2xl text-purple-700">Select Arweave node server.</h2>
              <select value={arweaveNode} onChange={(e) => { setArweaveNode(e.target.value) }}
                className="w-full font-thin p-2 rounded border text-purple-700 border-purple-300 placeholder-purple-200 h-10">
                {arweaveNodeList.map((item: string, index) => {
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
                  <DynamicReactJson src={metaData} displayDataTypes={false} defaultValue={{ ok: false }} name={false} />
                </div>

              </div>
            </div>
            <div className="w-full md:w-1/3 my-2">
              {
                metaData.status == 'fetching...' ? <></> : <div>
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
              <div className="break-all">
                {
                  (verifyServerMetadataSignatureStatus && metaData.reference) ? <>
                    <CustomerValidations metadata={metaData} />
                  </> : <></>
                }
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-thin text-sm text-purple-700" >Post Content</h2>
            {
              (verifyServerMetadataSignatureStatus && reference) ? <>
                {
                  reference.map((item: IReference, index) => {
                    const { body, refer } = item;
                    if (body.title && body.content) {
                      return <div key={index}>
                        <div className=" shadow-inner border rounded border-purple-300 mt-2 p-4">
                          <h2 className="my-2 text-2xl">{body.title}</h2>
                          <div className="prose">
                            {
                              renderHTML(md.render(body.content))
                            }
                          </div>
                        </div>
                      </div>
                    } else {
                      return <div key={index}></div>
                    }
                  })
                }
              </> : <></>
            }
          </div>
        </main>
      </div>
    )
  } else {
    return <> HASH ERROR</>
  }

}

Viewer.getInitialProps = async ({ query }) => {

  const { hash } = query;

  try {
    return {
      ok: true,
      hash
    }
  } catch (error) {
    return {
      ok: false,
      hash,
      msg: ''
    }
  }
};

export default Viewer;