/* eslint-disable react/no-unknown-property */
import Head from 'next/head';

const Header = (props: {
  title?: string
  head?: {
    title: string
  }
}) => {
  return <>
    {
      props.head ? <Head>
        <title>{props.head?.title || "Data Viewer"}</title>
        <meta name="description" content="meta-network-data-viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head> : undefined
    }
    <header className=" bg-purple-900">
      <div className="mx-auto max-w-6xl p-4 flex flex-row items-center">
        <div>
          <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.75 0.721688C14.9047 0.632371 15.0953 0.632371 15.25 0.721688L28.9724 8.64434C29.1271 8.73365 29.2224 8.89872 29.2224 9.07735V24.9226C29.2224 25.1013 29.1271 25.2663 28.9724 25.3557L15.25 33.2783C15.0953 33.3676 14.9047 33.3676 14.75 33.2783L1.02757 25.3557C0.872868 25.2663 0.777568 25.1013 0.777568 24.9226V9.07735C0.777568 8.89872 0.872867 8.73365 1.02757 8.64434L14.75 0.721688Z" stroke="white" />
            <circle cx="15" cy="17" r="6.5" stroke="white" />
          </svg>



        </div>
        <h1 className="m-0 ml-3 text-2xl font-thin text-white">{props.title || "DATA VIEWER"}</h1>
      </div>
    </header>
  </>
}

export default Header;