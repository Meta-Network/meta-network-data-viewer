import Head from 'next/head';
import arweaveNodeList from '../../arweave-node.json';
import DataViewer from '../../components/DataViewer';

const ArweaveViewer: any = (props: { hash: string, ok: boolean }) => (props.ok) ? (
  <div>
    <Head>
      <title>meta-network-data-viewer {props.hash}</title>
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
        platform: 'arweave',
        id: props.hash,
        idName: 'hash',
        dataSourceName: 'Arweave Node Server',
        dataSourceList: arweaveNodeList,
        timeout: 20000
      }
    } />
  </div>
) : <>CID ERROR</>

ArweaveViewer.getInitialProps = async ({ query }) => query.hash ? { hash: query.hash, ok: true } : { ok: false }

export default ArweaveViewer;