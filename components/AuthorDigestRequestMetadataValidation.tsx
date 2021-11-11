import { useEffect, useState } from 'react';
import { SignatureMetadata, AuthorDigestRequestMetadata } from '@metaio/meta-signature-util/type/types';
import { verifyDigest } from '@metaio/meta-signature-util';
import { VerifyStatus } from '../utils/status';
import VerifyResult from './VerifyResult';

type AuthorDigestRequestMetadataValidatioProps = {
  metadata: AuthorDigestRequestMetadata
  refer?: string
}

const AuthorDigestRequestMetadataValidation = (props: AuthorDigestRequestMetadataValidatioProps) => {

  const { metadata, refer } = props;
  const [dig, setDig] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');

  useEffect(() => {
    setDig(metadata.digest);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [])

  type itemProps = {
    title: string,
    content: string
  }

  const FormItem = (props: itemProps) => {
    const { title, content } = props;
    return <div className="mt-2">
      <p className="font-thin text-sm text-purple-700">{title}</p>
      <p className="p-1 my-1  font-thin text-xs bg-purple-100 rounded text-purple-700">{content}</p>
    </div>
  }

  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Digest and validation</h2>
    {
      refer ? <FormItem title="Refer:" content={refer} /> : <></>
    }
    {
      dig ? <FormItem title="Digest:" content={dig} /> : <></>
    }
    {
      metadata.title ? <FormItem title="Title:" content={metadata.title} /> : <></>
    }
    <div className="flex flex-col mt-2">
      <p className="font-thin text-sm text-purple-700">Body:</p>
      <textarea value={customerMetaData} onChange={(e) => {
        setVerifyStatus(VerifyStatus.Unverified);
        setCustomerMetaData(e.target.value);
      }}
        className="p-1 my-1 w-full  py-1 h-40  text-xs rounded border-2 border-purple-400 font-thin  text-purple-400" />
      <VerifyResult status={verifyStatus} />
      <button onClick={() => {
        try {
          const result = verifyDigest(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className="my-1 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-500">VALIDATE</button>
    </div>
  </div>
}

export default AuthorDigestRequestMetadataValidation;