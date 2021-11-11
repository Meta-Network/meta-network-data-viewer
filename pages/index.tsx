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

