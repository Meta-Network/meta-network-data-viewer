import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/index';
// import DataViewer from '../components/DataViewer';
// import arweaveNodeList from '../arweave-node.json';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('img', {
      name: /Meta Network/i,
    })
    expect(heading).toBeInTheDocument()
  })
})


// describe('Arweave', () => {
//   it('renders a heading', async () => {

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
//     const result = screen.getByText('ujEJk9ixgw1OmTSXqwlU8BEh-c7swBGDad6Q-QpaF5E')
//     expect(result).toBeInTheDocument()
//   })
// })
