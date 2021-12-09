import type { NextPage } from 'next'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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
          <h1 className="m-0 text-white flex flex-col justify-center items-center">
            <Image src="/logo.png" width="192" height="27" alt="Meta Network" />
            <span className="mt-4 text-2xl font-thin" >
              DATA VIEWER
            </span>
          </h1>

          <div className="mt-8 text-sm text-white font-thin flex flex-col space-y-2 w-full">
            <Link href="#verify" >
              <div className="w-full bg-purple-800 text-center hover:bg-purple-700 cursor-pointer py-2 rounded ">
                🔎 VERIFY META!
              </div>
            </Link>

            {/* <Link href="#verify" >
              <div className="w-full bg-purple-800 text-center hover:bg-purple-700 cursor-pointer py-2 rounded ">
                🔧 TOOL CHAIN
              </div>
            </Link> */}

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
    </div >
  )
}

export default Home

