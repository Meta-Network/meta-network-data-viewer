import { useEffect, useState } from 'react';
import { SignatureMetadata, AuthorSignatureMetadata } from '@metaio/meta-signature-util/type/types';
import { verifyAuthorDigestMetadataSignature } from '@metaio/meta-signature-util';
import { VerifyStatus } from '../utils/status';
import VerifyResult from './VerifyResult';
import ShowItem from './ShowItem';

type SignatureMetadataValidationProps = {
  metadata: SignatureMetadata
  refer?: string
}

const SignatureMetadataValidation = (props: SignatureMetadataValidationProps) => {

  const { metadata, refer } = props;
  const [sig, setSig] = useState<string>('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');

  useEffect(() => {
    setVerifyStatus(VerifyStatus.Unverified);
    setSig(metadata.signature);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [props])


  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Signature and validation</h2>

    {refer ? <ShowItem title="Refer:" content={refer} /> : <></>}
    {sig ? <ShowItem title="Signature:" content={sig} /> : <></>}
    {metadata.publicKey ? <ShowItem title="Public key:" content={metadata.publicKey} /> : <></>}

    <div className="flex flex-col mt-2">
      <p className="font-thin text-sm text-purple-700">Body:</p>
      <textarea value={customerMetaData} onChange={(e) => {
        setVerifyStatus(VerifyStatus.Unverified);
        setCustomerMetaData(e.target.value)
      }}
        className="p-1 my-1  w-full  py-1 h-40  text-xs rounded border-2 border-purple-400 font-thin  text-purple-400" />

      <VerifyResult status={verifyStatus} />
      <button onClick={() => {
        try {
          const result = verifyAuthorDigestMetadataSignature(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className=" w-full my-1  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-400">VALIDATE</button>
    </div>
  </div>
}

export default SignatureMetadataValidation;