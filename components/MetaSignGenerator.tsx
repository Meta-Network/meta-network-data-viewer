import Head from "next/head";
import * as signUtils from '@metaio/meta-signature-util';
import { useEffect, useState } from "react";

const MetaSignGenerator = () => {

  const [utilsMenus, setUtilsMenus] = useState<string[]>(['']);

  useEffect(() => {
    if (window) {
      const utilsMenuItems: string[] = [];
      Object.keys(signUtils).map(key => {
        if (signUtils[key].generate && signUtils[key].verify) {
          utilsMenuItems.push(key);
        }
      })
      console.log(utilsMenuItems);
      setUtilsMenus(utilsMenuItems)
    }

  }, [])

  return <div className="">
    <Head>
      <title>MetaData Generator</title>
      <meta name="description" content="meta-network-data-viewer" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div >
      <header className=" bg-purple-900">
        <div className="mx-auto max-w-6xl p-4">
          <h1 className="m-0 text-2xl font-thin text-white">MetaData Generator</h1>
        </div>
      </header>
      {/* <Menu.Item key="help">Help</Menu.Item>
            <Menu.Item key="author-digest">Degist</Menu.Item>
            <Menu.Item key="author-digest-sign">Digest sign</Menu.Item>
            <Menu.Item key="author-media-sign">Media sign</Menu.Item>
            <Menu.Item key="author-publish-meta-space-request">Publish metaspace request</Menu.Item>
            <Menu.Item key="author-publish-meta-space-server-verification-sign">Publish metaspace server verificatin</Menu.Item>
            <Menu.Item key="meta-network-grids-server-sign">Meta network grids server sign</Menu.Item>
            <Menu.Item key="server-verification-sign">Server Verification Sign</Menu.Item>
            <Menu.Item key="server-verification-sign-with-content">Sign with content</Menu.Item> */}

      <div className="mx-auto max-w-6xl p-4 text-purple-700 font-thin flex flex-row">
        <ul className="menu py-3 border border-purple-500  bg-base-100 rounded-xl">
          <li className="menu-title"><span>Menu Title</span></li>
          <li><a>Index & help</a></li>
          {
            utilsMenus.map((item, i) => {
              return <li key={i} className="hover:text-purple-50 hover:bg-purple-500"><a>{item}</a></li>
            })
          }
        </ul>
      </div>
    </div>
  </div >;
};

export default MetaSignGenerator;