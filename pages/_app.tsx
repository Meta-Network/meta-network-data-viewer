import '../styles/globals.css';
import '../styles/scrollBehavior.css';
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app';
import '../styles/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
