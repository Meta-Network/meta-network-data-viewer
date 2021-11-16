
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic'
const md = require('markdown-it')();
import ipfsGatewayList from '../../ipfs-gateway.json'
import renderHTML from 'react-render-html';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as metaSignatureUtil from '@metaio/meta-signature-util';
import { SignatureMetadata, AuthorDigestRequestMetadata } from '@metaio/meta-signature-util/type/types';

import CustomerValidations from '../../components/CustomerValidations';
import DataViewer from '../../components/DataViewer';
interface IReference {
  refer: string;
  body: SignatureMetadata & AuthorDigestRequestMetadata;
}

const Viewer: any = (props) => {
  if (props.ok) {
    return (
      <div>
        <Head>
          <title>meta-network-data-viewer</title>
          <meta name="description" content="meta-network-data-viewer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className=" bg-purple-900">
          <div className="mx-auto max-w-6xl p-4">
            <h1 className="text-2xl font-thin text-white">meta-network-data-viewer</h1>
          </div>
        </header>
        <DataViewer options={
          {
            platform: 'ipfs',
            id: props.cid,
            idName: 'CID',
            dataSourceName: 'IPFS Gateway',
            dataSourceList: ipfsGatewayList,
            timeout: 10000
          }
        } />
      </div>
    )
  } else {
    return <> CID ERROR</>
  }

}

Viewer.getInitialProps = async ({ query }) => {

  const { cid } = query;

  try {
    return {
      ok: true,
      cid
    }
  } catch (error) {
    return {
      ok: false,
      cid,
      msg: ''
    }
  }
};

export default Viewer;