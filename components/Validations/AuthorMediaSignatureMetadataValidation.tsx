import { useContext, useEffect, useState } from 'react';
import { VerifyStatus } from '../../utils/status';
import { VerifyResult, ShowItem } from '../PageElements';
import DataSourceContext from '../../utils/dataSource';
import initMetaSignatureUtil, { AuthorMediaSignatureMetadata, MetadataVersion } from '../../utils/metaSignature';
import platformSourceList from '../../utils/source';

type ValidatioProps = {
  metadata: AuthorMediaSignatureMetadata,
  version?: number,
}

const AuthorMediaSignatureMetadataValidation = (props: ValidatioProps) => {
  const { metadata } = props;
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');
  const [customerSource, setCustomerSource] = useState<string>('');
  const { source, platform } = useContext(DataSourceContext);
  const { metadataVersion } = useContext(MetadataVersion);
  const { authorMediaSign } = initMetaSignatureUtil(metadataVersion || 1);

  useEffect(() => {
    setVerifyStatus(VerifyStatus.Unverified);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [metadata]);


  const mediaDataPlatform = metadata.platform;  //source is the data source

  useEffect(() => {
    if (platform !== mediaDataPlatform) {
      setCustomerSource(platformSourceList[mediaDataPlatform][0]);
    }
  }, [mediaDataPlatform, platform]);

  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Digest and validation</h2>
    {metadata.title ? <ShowItem title="Title:" content={metadata.title} /> : <></>}
    {
      // customer slector
      platform !== mediaDataPlatform ? <select value={customerSource} onChange={(e) => { setCustomerSource(e.target.value) }}
        className="w-full font-thin my-1 rounded text-xs border text-purple-700 border-purple-300 placeholder-purple-200">
        {platformSourceList[mediaDataPlatform].map((item: string, index) => {
          return <option key={index} value={item}>{item.replace(':hash', '')}</option>
        })}
      </select> : <></>
    }
    {
      // TODO - add more fields
      metadata.contentType === 'image/jpeg' || metadata.contentType === 'image/png' ? <div className="my-4">
        <img className="rounded-xl shadow-xl drop-shadow-2xl" src={`${(platform === mediaDataPlatform ? source.replace(':hash', metadata.platformHash) : customerSource.replace(':hash', metadata.platformHash))}`} />
      </div> : <></>
    }
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
          const result = authorMediaSign.verify(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className="my-1 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-400">VALIDATE</button>
    </div>
  </div>
};

export default AuthorMediaSignatureMetadataValidation;