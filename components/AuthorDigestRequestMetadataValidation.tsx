import { useState } from "react";

const AuthorDigestRequestMetadataValidation = () => {

  const [dig, setDig] = useState('');

  return <div>
    <h2 className="font-thin text-sm text-purple-700">Digest and validation</h2>
    <div className="flex flex-col">
      <textarea value={dig} onChange={(e) => { setDig(e.target.value) }}
        className="p-1 my-2 w-full  py-1 h-16  text-xs rounded border-2 border-purple-400 font-thin  text-purple-400" />
      <button className="my-2 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-500">VALIDATE</button>
    </div>
  </div>
}

export default AuthorDigestRequestMetadataValidation;