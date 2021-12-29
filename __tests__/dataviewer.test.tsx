import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DataViewer from '../components/DataViewer';
import arweaveNodeList from '../arweave-node.json';


test('loads and displays greeting', async () => {
  render(<DataViewer options={
    {
      platform: 'arweave',
      id: 'ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E',
      idName: 'hash',
      dataSourceName: 'Arweave Node Server',
      dataSourceList: arweaveNodeList,
      timeout: 20000,
      isTest: true,
    }
  } />);

  // await waitFor(() => screen.getByText('ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E'));
  const result = screen.getByText("ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E");
  // expect(screen.getByText('836672')).toBeInTheDocument()
  expect(result).toBeInTheDocument();
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toBeDisabled()
})


// describe('Arweave', () => {
//   it('renders a heading', () => {

//     // fetch.once(JSON.stringify({
//     //   "@context": "https://metanetwork.online/ns/grid",
//     //   "@type": "meta-network-grids-server-sign",
//     //   "@version": "1.0.0",
//     //   "signatureAlgorithm": "curve25519",
//     //   "publicKey": "0xbada4a41bc2f9a5629f22cf8660eb3bfb766713e10d4ba81a0082c327a38d857",
//     //   "items": [
//     //     {
//     //       "userId": 473,
//     //       "subdomain": "team.metaspaces.me",
//     //       "metaSpaceSiteId": 52,
//     //       "metaSpaceSiteUrl": "https://team.metaspaces.me",
//     //       "id": 461,
//     //       "previousTx": "DqJEsYZxn0ZrW6U-2pI2EWs4PgdJw0zfxRI9GHGPAKA"
//     //     }
//     //   ],
//     //   "nonce": "0x6fbf493c195bc6e7261c472a",
//     //   "claim": "I, metanetwork.online maintain grids for users, using the key: 0xbada4a41bc2f9a5629f22cf8660eb3bfb766713e10d4ba81a0082c327a38d857",
//     //   "digest": "0xb28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21",
//     //   "signature": "0x8e0b8eb201c8617166bec26ba8b2086f9b253208ec156ad98be0506c1199412a97c4a2cf67292790b7dfa9c0e5b992aed6631d63b992498205965a61416d6486",
//     //   "ts": 1640174400293,
//     //   "previousBatchTx": "3mSGg3chcVI5m42ruHHYdUhfAFN1RZxMMVyOOsbtsSg"
//     // }));

//     render(<DataViewer options={
//       {
//         platform: 'arweave',
//         id: 'ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E',
//         idName: 'hash',
//         dataSourceName: 'Arweave Node Server',
//         dataSourceList: arweaveNodeList,
//         timeout: 20000
//       }
//     } />)

//     waitFor(() => screen.getByText('836672'));

//     expect(screen.getByText("ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E")).toBeInTheDocument();
//     // getByText("VALIDATE").click();
//     // await waitFor(() => getByText("verify success."));
//     // await waitFor(() => getByText("0x6fbf493c195bc6e7261c472a"));
//     // expect(await getByText("0x6fbf493c195bc6e7261c472a")).toBeDefined();
//     // expect(result).toBeInTheDocument()
//   })
// })
