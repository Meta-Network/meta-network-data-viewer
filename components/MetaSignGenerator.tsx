import Head from "next/head";
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

const MetaSignGenerator = () => {
  return <div className="">
    <Head>
      <title>MetaData Generator</title>
      <meta name="description" content="meta-network-data-viewer" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout className=" h-screen" >
      <header className=" bg-purple-900">
        <div className="mx-auto max-w-6xl p-4">
          <h1 className="m-0 text-2xl font-thin text-white">MetaData Generator</h1>
        </div>
      </header>
      <Layout>
        <Sider width={300} className="site-layout-background overflow-auto" >
          <Menu
            mode="inline"
            defaultSelectedKeys={['help']}
            defaultOpenKeys={['author']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={(e) => { console.log(e) }}
          >
            <Menu.Item key="help">Help</Menu.Item>
            <Menu.Item key="author-digest">Degist</Menu.Item>
            <Menu.Item key="author-digest-sign">Digest sign</Menu.Item>
            <Menu.Item key="author-media-sign">Media sign</Menu.Item>
            <Menu.Item key="author-publish-meta-space-request">Publish metaspace request</Menu.Item>
            <Menu.Item key="author-publish-meta-space-server-verification-sign">Publish metaspace server verificatin</Menu.Item>
            <Menu.Item key="meta-network-grids-server-sign">Meta network grids server sign</Menu.Item>
            <Menu.Item key="server-verification-sign">Server Verification Sign</Menu.Item>
            <Menu.Item key="server-verification-sign-with-content">Sign with content</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div >;
};

export default MetaSignGenerator;