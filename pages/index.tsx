import type { NextPage } from 'next'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {

  const router = useRouter()
  const [sourceType, setSourceType] = useState('ipfs');
  const [hash, setHash] = useState('');

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <div className="h-screen flex flex-row items-center justify-center bg-purple-900 w-full">
        <Head>
          <title>Data viewer | Meta Network</title>
          <meta name="description" content="meta-network-data-viewer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <div className="">
          <h1 className="text-white flex flex-col justify-center items-center"><img
            src="data:image/png;base64,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"
            width="192" alt="Meta Network" />
            <span className="mt-4 text-2xl font-thin" >
              DATA VIEWER
            </span>
          </h1>

          <div className="mt-4 text-sm text-white font-thin flex flex-row space-x-2 w-full">
            <a href="#verify" className="block w-full">
              <div className="w-full bg-purple-800 text-center hover:bg-purple-700 cursor-pointer py-2 rounded ">
                VERIFY META!
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="py-10 w-full bg-purple-900">

      </div>
      <div className="py-10 w-full bg-purple-200" id="verify">
        <div className=" -mt-28 mx-auto max-w-2xl bg-white py-8 px-2 sm:px-8 rounded-none sm:rounded font-thin shadow-2xl">
          <h2 className="text-2xl text-purple-900">VERIFY META 🚀</h2>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-1 mt-6 items-end">
            <select value={sourceType} onChange={(e) => { setSourceType(e.target.value) }}
              className="mt-2 w-full md:w-1/5 text-xs font-thin p-1 h-8 rounded border text-purple-700 border-purple-300 placeholder-purple-200">
              <option value={'ipfs'}>IPFS</option>
              <option value={'arweave'}>ARWEAVE</option>
            </select>
            <input type="text" value={hash} onChange={(e) => { setHash(e.target.value) }} className="w-full md:w-3/5 text-xs mt-2  border h-8 border-purple-300 rounded p-1 font-thin text-purple-300 placeholder-purple-300" placeholder="CID/HASH" />
            <div className="w-full md:w-1/5 mt-2 cursor-pointer text-center py-2 bg-purple-900 hover:bg-purple-700 text-white font-thin rounded h-8 text-xs"
              onClick={(e) => {
                e.preventDefault();
                if (hash.length > 0) {
                  router.push(`/${encodeURIComponent(sourceType)}/${encodeURIComponent(hash)}`);
                } else {
                  toast.warning("CID/HASH empty");
                  return;
                }
              }}
            >VERIFY</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

