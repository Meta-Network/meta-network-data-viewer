import { useEffect, useState } from "react";
import { AuthorSignatureMetadata, SignatureMetadata } from '@metaio/meta-signature-util/type/types';
import { verifyAuthorDigestMetadataSignature } from '@metaio/meta-signature-util';

type SignatureMetadataValidationProps = {
  metadata: AuthorSignatureMetadata
  refer?: string
}

enum VerifyStatus {
  Unverified,
  Verified,
  VerificationFailed
}

const SignatureMetadataValidation = (props: SignatureMetadataValidationProps) => {

  const { metadata, refer } = props;

  const [sig, setSig] = useState<string>('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');
  useEffect(() => {
    setSig(metadata.signature);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [])

  const verifyResult = () => {
    switch (verifyStatus) {
      case VerifyStatus.Verified:
        return <p className="p-1 font-thin my-1 text-xs bg-green-100 rounded text-green-700">verify success.</p>
        break;
      case VerifyStatus.VerificationFailed:
        return <p className="p-1 font-thin my-1 text-xs bg-red-100 rounded text-red-700">verify failure.</p>
        break;

      default:
        return <></>
        break;
    }
  }

  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Signature and validation</h2>
    {
      refer ? <div className="mt-2">
        <p className="font-thin text-sm text-purple-700">Refer:</p>
        <p className="p-1 my-1  font-thin text-xs bg-purple-100 rounded text-purple-700">{refer}</p>
      </div> : <></>
    }
    {
      sig ? <div className="mt-2">
        <p className="font-thin text-sm text-purple-700">Signature:</p>
        <p className="p-1 my-1 mt-2 font-thin text-xs bg-purple-100 rounded text-purple-700">{sig}</p> </div> : <></>
    }
    <div className="flex flex-col mt-2">
      <p className="font-thin text-sm text-purple-700">Body:</p>
      <textarea value={customerMetaData} onChange={(e) => {
        setVerifyStatus(VerifyStatus.Unverified);
        setCustomerMetaData(e.target.value)
      }}
        className="p-1 my-1  w-full  py-1 h-40  text-xs rounded border-2 border-purple-400 font-thin  text-purple-400" />

      {
        verifyResult()
      }
      <button onClick={() => {
        try {
          const verifyResult = verifyAuthorDigestMetadataSignature(JSON.parse(customerMetaData));
          verifyResult ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }

      }} className=" w-full my-1  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-500">VALIDATE</button>
    </div>
  </div>
}

export default SignatureMetadataValidation;