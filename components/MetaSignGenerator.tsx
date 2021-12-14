import Head from "next/head";
import * as signUtils from '@metaio/meta-signature-util';
import * as utils from '@metaio/meta-signature-util/lib/utils';
import { useEffect, useState } from "react";
import Link from "next/link";
import ShowItem from "./ShowItem";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MetaSignGeneratorArea from './MetaSignGeneratorArea';
import ViewerFooter from "./ViewerFooter";

const MetaSignGenerator = () => {

  const [utilsMenus, setUtilsMenus] = useState<string[]>(['']);
  const [currentItem, setCurrentItem] = useState<string>('help');

  const [seed, setSeed] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');

  const generateKeys = () => {
    const seedResult = utils.generateSeed();
    setSeed(seedResult.join(','));
    const keys = utils.generateKeys(seedResult);
    setPrivateKey(keys.private);
    setPublicKey(keys.public);
  }

  const saveKeys = async (content: string, filename: string) => {
    if (document && window) {
      const blobUrl = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${filename}.txt`;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    }
  }


  useEffect(() => {
    if (window) {
      const utilsMenuItems: string[] = [];
      Object.keys(signUtils).map(key => {
        if (signUtils[key].generate && signUtils[key].verify) {
          utilsMenuItems.push(key);
        }
      })
      setUtilsMenus(utilsMenuItems)
    }
  }, [])

  return <div className="">
    <Head>
      <title>MetaData Generator</title>
      <meta name="description" content="meta-network-data-viewer" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ToastContainer />
    <div >
      <header className=" bg-purple-900">
        <div className="mx-auto max-w-6xl p-4">
          <h1 className="m-0 text-2xl font-thin text-white">MetaData Generator</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl p-4">
        <div className="alert alert-success">
          <div className="flex-1 text-sm">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2311" width="25" height="25"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="2312"></path></svg>
            <label className="ml-2">This page is GUI tool for MetaNetwork/meta-signature-util <span className=" underline"><Link href={'https://github.com/Meta-Network/meta-signature-util'}>https://github.com/Meta-Network/meta-signature-util</Link></span></label>
          </div>
        </div>
        <div className=" text-purple-700 font-thin justify-between mt-4">
          <h2>Keys</h2>
          <div className="border border-purple-400 rounded-lg p-2">
            <button
              onClick={generateKeys}
              className="my-2 btn btn-sm font-thin w-full bg-purple-500 border-0 hover:bg-purple-400" >Generate Prvate keys and public keys</button>
            {
              seed.length > 0 ? <div className="my-2">
                <div className="text-sm font-thin">Seeds <span onClick={() => {
                  saveKeys(seed, 'seed')
                }} className="ml-2 text-xs underline cursor-pointer">download</span></div>
                <div className="text-xs rounded-lg bg-purple-100 py-1 px-2 break-all">
                  {seed}
                </div></div> : <></>
            }

            {
              publicKey.length > 0 ? <div className="my-2">
                <div className="text-sm font-thin">Public key <span onClick={() => {
                  saveKeys(publicKey, 'public-key')
                }} className="ml-2 text-xs underline cursor-pointer">download</span></div>
                <div className="text-xs rounded-lg bg-purple-100 py-1 px-2">
                  {publicKey}
                </div></div> : <></>
            }

            {
              privateKey.length > 0 ? <div className="my-2">
                <div className="text-sm font-thin">Private key <span onClick={() => {
                  saveKeys(privateKey, 'private-key')
                }} className="ml-2 text-xs underline cursor-pointer">download</span></div>
                <div className="text-xs rounded-lg bg-purple-100 py-1 px-2 ">
                  {privateKey}
                </div>

              </div> : <></>
            }

          </div>
        </div>
        <div className=" text-purple-700 font-thin flex flex-row space-x-2 justify-between mt-4">
          <ul className="menu py-3 border border-purple-400 bg-base-100 rounded-xl text-xs w-80 
        shadow-inner drop-shadow-2xl ">
            <li className="menu-title"><span>Menu Title</span></li>
            <li key="help" className="hover:text-purple-50 hover:bg-purple-500" onClick={() => setCurrentItem('help')}><a>Index & help</a></li>
            {
              utilsMenus.map((item, i) => {
                return <li key={i}
                  onClick={
                    () => {
                      setCurrentItem(item)
                    }
                  }
                  className="hover:text-purple-50 hover:bg-purple-500">
                  <a className="text-xs">{item}</a>
                </li>
              })
            }
          </ul>
          <div className="p-2 border border-purple-400 bg-base-100 rounded-xl text-xs w-2/3">
            <div className="font-bold text-sm lg:text-2xl border-b  border-purple-500 text-purple-500 py-1 break-all">{currentItem}</div>
            <div className="mt-4">
              <MetaSignGeneratorArea currentItem={currentItem} privateKey={privateKey} publicKey={publicKey} />
            </div>
          </div>
        </div>
        <ViewerFooter />
      </div>
    </div>

  </div >;
};

export default MetaSignGenerator;