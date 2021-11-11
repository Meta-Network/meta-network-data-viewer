import { useEffect, useState } from "react";
import { AuthorSignatureMetadata, SignatureMetadata } from '@metaio/meta-signature-util/type/types';
import { verifyAuthorDigestMetadataSignature } from '@metaio/meta-signature-util';

type SignatureMetadataValidationProps = {
  metadata: AuthorSignatureMetadata
}

const SignatureMetadataValidation = (props: SignatureMetadataValidationProps) => {

  const { metadata } = props;

  const [sig, setSig] = useState<string>('');

  useEffect(() => {
    setSig(metadata.signature);
  }, [])

  return <div className="mt-2">
    <h2 className="font-thin text-sm text-purple-700">Signature and validation</h2>
    <div className="flex flex-col ">
      <textarea value={sig} onChange={(e) => { setSig(e.target.value) }}
        className="p-1 my-2 w-full  py-1 h-16  text-xs rounded border-2 border-purple-400 font-thin  text-purple-400" />
      <button onClick={() => {
        const verifyResult = verifyAuthorDigestMetadataSignature(metadata);
        console.log(`verifyResult`, verifyResult);
      }} className="my-2 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-500">VALIDATE</button>
    </div>
  </div>
}

export default SignatureMetadataValidation;