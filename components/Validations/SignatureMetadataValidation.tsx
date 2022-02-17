import { useEffect, useState, useContext } from 'react';
import initMetaSignatureUtil, { BaseSignatureMetadata, MetadataVersion } from '../../utils/metaSignature';
import { VerifyStatus } from '../../utils/status';
import { VerifyResult, ShowItem } from '../PageElements';

type SignatureMetadataValidationProps = {
  metadata: BaseSignatureMetadata
  refer?: string,
  version?: number,
}

const SignatureMetadataValidation = (props: SignatureMetadataValidationProps) => {

  const { metadata, refer } = props;
  const [sig, setSig] = useState<string>('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');
  const { metadataVersion } = useContext(MetadataVersion);
  const { authorDigestSign } = initMetaSignatureUtil(metadataVersion || 1);

  useEffect(() => {
    setVerifyStatus(VerifyStatus.Unverified);
    setSig(metadata.signature);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [metadata])


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
        className="p-1 my-1  w-full  py-1 h-40  text-xs rounded border border-purple-300 font-thin  text-purple-400" />

      <VerifyResult status={verifyStatus} />
      <button onClick={() => {
        try {
          const result = authorDigestSign.verify(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className=" w-full my-1  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-400">VALIDATE</button>
    </div>
  </div>
}

export default SignatureMetadataValidation;