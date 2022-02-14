import { useEffect, useState, useContext } from 'react';
import initMetaSignatureUtil, { AuthorDigestMetadata, MetadataVersion } from '../../utils/metaSignature';
import { VerifyStatus } from '../../utils/status';
import VerifyResult from '../PageElements/VerifyResult';
import ShowItem from '../PageElements/ShowItem';

type AuthorDigestRequestMetadataValidatioProps = {
  metadata: AuthorDigestMetadata
  refer?: string,
  version?: number,
}

const AuthorDigestRequestMetadataValidation = (props: AuthorDigestRequestMetadataValidatioProps) => {

  const { metadata, refer } = props;
  const [dig, setDig] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');
  const { metadataVersion } = useContext(MetadataVersion);
  const { authorDigest } = initMetaSignatureUtil(metadataVersion || 1);

  useEffect(() => {
    setVerifyStatus(VerifyStatus.Unverified);
    setDig(metadata.digest);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [metadata]);


  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Digest and validation</h2>
    {refer ? <ShowItem title="Refer:" content={refer} /> : <></>}
    {dig ? <ShowItem title="Digest:" content={dig} /> : <></>}
    {metadata.title ? <ShowItem title="Title:" content={metadata.title} /> : <></>}
    <div className="flex flex-col mt-2">
      <p className="font-thin text-sm text-purple-700">Body:</p>
      <textarea value={customerMetaData} onChange={(e) => {
        setVerifyStatus(VerifyStatus.Unverified);
        setCustomerMetaData(e.target.value);
      }}
        className="p-1 my-1 w-full  py-1 h-40  text-xs rounded border border-purple-300 font-thin  text-purple-400" />
      <VerifyResult status={verifyStatus} />
      <button onClick={() => {
        try {
          const result = authorDigest.verify(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className="my-1 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-400">VALIDATE</button>
    </div>
  </div>
}

export default AuthorDigestRequestMetadataValidation;