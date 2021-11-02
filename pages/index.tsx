import type { NextPage } from 'next'
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
const md = require('markdown-it')();
import ipfsGatewayList from '../ipfs-gateway.json'
import renderHTML from 'react-render-html';
import axios from 'axios';


const Home: NextPage = () => {
  const [cid, setCid] = useState('QmSc7Sb132M12bm9owwziEWLf1ibiMCLU1vRnc2P3JMxFN')
  const [ipfsGateway, setIpfsGateway] = useState('https://ipfs.io/ipfs/:hash')
  const [dig, setDig] = useState('0x2b44d342754515f18a457df40edbfad9f2f2066e55b21e084a1222b5670c166541c48076a19e71cb09d8154fe460a60e57809f9907158d6a2a5b705c804c4e871b')
  const [sig, setSig] = useState('0x2b44d342754515f18a457df40edbfad9f2f2066e55b21e084a1222b5670c166541c48076a19e71cb09d8154fe460a60e57809f9907158d6a2a5b705c804c4e871b')
  const [metaData, setMetaData] = useState<any>({})

  const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false })

  const getCidContent = useCallback(async () => {
    try {
      const content = await (await axios.get(`${ipfsGateway.replace(':hash', cid)}`)).data
      setMetaData(content)
    } catch (error) {
      alert(`request fail`)
    }
  }, [cid, ipfsGateway])

  useEffect(() => {
    if (cid && ipfsGateway) {
      getCidContent()
    }
  }, [cid, ipfsGateway])

  return (
    <div>
      <Head>
        <title>meta-network-data-viewer</title>
        <meta name="description" content="meta-network-data-viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 md:p-6 bg-purple-900">
        <h1 className="text-2xl font-thin text-white">meta-network-data-viewer</h1>
      </header>

      <main className="mx-auto max-w-4xl p-4">

        <div className="w-full  flex flex-col md:flex-row md:space-x-2 ">
          <div className="w-full md:w-1/2 my-2">
            <select value={ipfsGateway} onChange={(e) => { setIpfsGateway(e.target.value) }}
              className="w-full font-thin p-2 rounded border-2 text-purple-700 border-purple-700 placeholder-purple-200 h-10">
              {ipfsGatewayList.map((item: string, index) => {
                return <option key={index} value={item}>{item.replace(':hash', '')}</option>
              })}
            </select>
          </div>
          <div className="w-full md:w-1/2 my-2">
            <input type="text"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              disabled={true}
              className="w-full font-thin text-xs text-purple-700 bg-purple-100 p-2 rounded border-2 border-purple-700 placeholder-purple-200 h-10 " placeholder="Please input IPFS CID" />
          </div>
        </div>
        <div className="my-2 mt-8">
          <h2 className="font-thin text-sm text-purple-700">Origin Metadata</h2>
          <div className="p-2 border-2 border-purple-700 rounded mt-2">
            <div className="overflow-auto">
              <DynamicReactJson src={metaData} displayDataTypes={false} defaultValue={{ ok: false }} />
            </div>

          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-thin text-sm text-purple-700">Digest and validation</h2>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <input type="text" value={dig} onChange={(e) => { setDig(e.target.value) }}
              className="my-2 w-full md:w-10/12 py-1 h-8  text-xs rounded border-2 border-purple-700 font-thin  text-purple-400" />
            <button className="my-2 w-full md:w-2/12 py-1 px-4 text-xs h-8 rounded bg-purple-700 font-thin text-white hover:bg-purple-500">VALIDATE</button>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="font-thin text-sm text-purple-700">Signature and validation</h2>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <input type="text" value={sig} onChange={(e) => { setSig(e.target.value) }}
              className="my-2 w-full md:w-10/12 py-1 h-8  text-xs rounded border-2 border-purple-700 font-thin  text-purple-400" />
            <button className="my-2 w-full md:w-2/12 py-1 px-4 text-xs h-8 rounded bg-purple-700 font-thin text-white hover:bg-purple-500">VALIDATE</button>
          </div>
        </div>

        <div>
          <h2 className="font-thin text-sm text-purple-700" >Post Content</h2>
          <div className=" shadow-inner border-2 rounded border-purple-700 mt-2 ">
            <div className="prose">
              {
                renderHTML(md.render('> markdown-it rulezz! '))
              }
            </div>

          </div>
        </div>
      </main>

    </div>
  )
}

export default Home

