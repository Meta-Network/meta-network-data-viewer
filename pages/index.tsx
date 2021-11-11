import type { NextPage } from 'next'
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
const md = require('markdown-it')();
import ipfsGatewayList from '../ipfs-gateway.json'
import renderHTML from 'react-render-html';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home: NextPage = () => {
  const [cid, setCid] = useState('');
  const [ipfsGateway, setIpfsGateway] = useState('');
  const [dig, setDig] = useState('0x2b44d342754515f18a457df40edbfad9f2f2066e55b21e084a1222b5670c166541c48076a19e71cb09d8154fe460a60e57809f9907158d6a2a5b705c804c4e871b');
  const [sig, setSig] = useState('0x2b44d342754515f18a457df40edbfad9f2f2066e55b21e084a1222b5670c166541c48076a19e71cb09d8154fe460a60e57809f9907158d6a2a5b705c804c4e871b');
  const [metaData, setMetaData] = useState<any>({ status: 'fetching...' })

  const DynamicReactJson = dynamic(() => import('react-json-view'), { ssr: false })

  const getCidContent = useCallback(async () => {
    try {
      const content = await (await axios.get(`${ipfsGateway.replace(':hash', cid)}`, { timeout: 5000 })).data
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
  }, [cid, ipfsGateway])

  useEffect(() => {
    if (cid && ipfsGateway) {
      getCidContent()
    }
  }, [ipfsGateway])

  useEffect(() => {
    setCid('Qme3PxAANAXHNqmw4r1UV9uqgYdD7e3A8HcXYVE16ZpgQk');
    setIpfsGateway('https://ipfs.io/ipfs/:hash');
  }, [])

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

      <main className="mx-auto max-w-6xl p-4 font-thin text-purple-700 ">
        <p>View data and verify from meta.</p>
      </main>

    </div>
  )
}

export default Home

