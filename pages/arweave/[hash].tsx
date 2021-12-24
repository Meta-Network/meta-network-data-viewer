import Head from 'next/head';
import arweaveNodeList from '../../arweave-node.json';
// import DataViewer from '../../components/DataViewer';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const DataViewer = dynamic(() => import('../../components/DataViewer'));

const ArweaveViewer: any = (props) => {

  const router = useRouter();
  const { hash } = router.query;

  return <div>
    <Head>
      <title>meta-network-data-viewer {hash}</title>
      <meta name="description" content="meta-network-data-viewer" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className=" bg-purple-900">
      <div className="mx-auto max-w-6xl p-4">
        <h1 className="m-0 text-2xl font-thin text-white">meta-network-data-viewer</h1>
      </div>
    </header>
    <DataViewer options={
      {
        platform: 'arweave',
        id: hash as string,
        idName: 'hash',
        dataSourceName: 'Arweave Node Server',
        dataSourceList: arweaveNodeList,
        timeout: 20000
      }
    } />

  </div>
}

export default ArweaveViewer;