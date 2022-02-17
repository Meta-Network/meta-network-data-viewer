import ipfsGatewayList from '../../ipfs-gateway.json';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Header, ViewerFooter } from '../../components/PageElements';
const DataViewer = dynamic(() => import('../../components/DataViewer'));

const IPFSViewer: any = () => {

  const router = useRouter();
  const { cid } = router.query;

  return <div>
    <Header head={{ title: `Data Viewer: ${cid || "loading..."}` }} />
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
    <ViewerFooter />
  </div>
}


export default IPFSViewer;