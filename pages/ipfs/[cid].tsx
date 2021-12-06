import Head from 'next/head';
import ipfsGatewayList from '../../ipfs-gateway.json';
import DataViewer from '../../components/DataViewer';
import { useRouter } from 'next/router';

const IPFSViewer: any = () => {

  const router = useRouter();
  const { cid } = router.query;

  return (cid) ? (
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
          id: cid as string,
          idName: 'CID',
          dataSourceName: 'IPFS Gateway',
          dataSourceList: ipfsGatewayList,
          timeout: 20000
        }
      } />
    </div>
  ) : <>CID ERROR</>
}

export default IPFSViewer;