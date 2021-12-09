import React from "react"
React.useLayoutEffect = React.useEffect

import dynamic from 'next/dynamic';


const MetaSignGenerator = dynamic(() => import('../components/MetaSignGenerator'));

const GeneratorPage = () => {
  return <MetaSignGenerator />
}

export default GeneratorPage;