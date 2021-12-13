import Link from 'next/link';

const Footer = () => {
  return <footer className="flex flex-col md:flex-row w-full  py-24 justify-between font-light text-sm ">
    <div className='text-purple-400'>Github： <Link href={'https://github.com/Meta-Network/meta-network-data-viewer'}>Meta-Network/meta-network-data-viewer</Link></div>
    <div className='text-purple-400'>LICENSE: <Link href="https://github.com/Meta-Network/meta-network-data-viewer/blob/main/LICENSE">GNU Affero General Public License v3.0</Link></div>
  </footer>
}

export default Footer;