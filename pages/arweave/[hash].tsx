import arweaveNodeList from '../../arweave-node.json';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Header, ViewerFooter } from '../../components/PageElements';

const DataViewer = dynamic(() => import('../../components/DataViewer'));

const ArweaveViewer: any = (props) => {

  const router = useRouter();
  const { hash } = router.query;

  return <div>
    <Header head={{ title: `Data Viewer: ${hash}` }} />
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
    <ViewerFooter />
  </div>
}

export default ArweaveViewer;