import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ShowItem from "./PageElements/ShowItem";
import * as signUtils from '@metaio/meta-signature-util';
import metaSignaturePayloads from '../utils/metaSignaturePayloads.json'

type GenratorAreaProps = {
  currentItem: string,
  privateKey: string,
  publicKey: string
}

const MetaSignGeneratorArea = (props: GenratorAreaProps) => {

  const { currentItem, privateKey, publicKey } = props;
  const payloadExample = useMemo(() => metaSignaturePayloads, []);

  let resultForm = <></>;
  const [generateTextArea, setGenerateTextArea] = useState<string>('');
  const [verifyTextArea, setVerifyTextArea] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const [authorDigest, setAuthorDigest] = useState<string>('');

  useEffect(() => {
    setPayload(JSON.stringify(payloadExample[currentItem] || { "message": "no test unit." }, null, 2));
    setGenerateTextArea('');
    setVerifyTextArea('');
  }, [currentItem, payloadExample])

  if (currentItem.toLowerCase() == 'help') {
    resultForm = <>
      <p>
        Generate publick key and private key on top.
      </p>
      <p>
        You can use this tool to test and generate MetaNetwork metadata by selecting the function in the left menu.
      </p>

    </>;
  } else {
    resultForm = <div>
      <h3 className="p-0 m-0 font-bold text-xs text-purple-500">Payload</h3>
      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        name="" id="" className="mt-1 border border-purple-200 w-full rounded p-2 h-40">
      </textarea>
      <h3 className="p-0 m-0 font-bold text-xs text-purple-500">Generate function</h3>
      <button
        onClick={() => {
          let result;

          if (currentItem == 'authorDigest') {

            result = signUtils[currentItem].generate(JSON.parse(payload));
            setGenerateTextArea(JSON.stringify(result, null, 2));
            setAuthorDigest(result.digest);
          }

          if (currentItem == 'authorDigestSign') {
            try {
              result = signUtils[currentItem].generate(
                { private: privateKey, public: publicKey },
                payloadExample[currentItem].domain || 'metaspace.life',
                authorDigest);
              setGenerateTextArea(JSON.stringify(result, null, 2));
            } catch (e) {
              toast.warning('Please check your privateKey, publicKey. the u need generate authorDigest in authorDigest menu.')
            }
          }

          if (currentItem == 'authorMediaSign') {
            try {
              result = signUtils[currentItem].generate(
                { private: privateKey, public: publicKey },
                'metaspace.life',
                JSON.parse(payload));
              setGenerateTextArea(JSON.stringify(result, null, 2));
            } catch (error) {
              toast.warning('Please check your privateKey, publicKey. the u need generate authorDigest in authorDigest menu.')
            }
          }

          if (currentItem == 'metaNetworkGridsServerSign') {
            try {
              result = signUtils[currentItem].generate(
                { private: privateKey, public: publicKey },
                'metaspace.life',
                JSON.parse(payload));
              setGenerateTextArea(JSON.stringify(result, null, 2));
            } catch (error) {
              toast.warning('Please check your privateKey, publicKey. the u need generate authorDigest in authorDigest menu.')
            }
          }

          if (currentItem == 'serverVerificationSign' || currentItem == 'authorPublishMetaSpaceServerVerificationSign') {
            try {
              result = signUtils[currentItem].generate(
                { private: privateKey, public: publicKey },
                'metaspace.life',
                JSON.parse(payload), '');
              setGenerateTextArea(JSON.stringify(result, null, 2));
            } catch (error) {
              console.log(error);
              toast.warning('Please check your privateKey, publicKey. the u need generate authorDigest in authorDigest menu.')
            }
          }

          if (currentItem == 'serverVerificationSignWithContent' || currentItem == 'authorPublishMetaSpaceRequest') {
            try {
              result = signUtils[currentItem].generate(
                JSON.parse(payload),
                '', JSON.parse(payload)
              );
              setGenerateTextArea(JSON.stringify(result, null, 2));
            } catch (error) {
              console.log(error);
              toast.warning('Please check your privateKey, publicKey. the u need generate authorDigest in authorDigest menu.')
            }
          }

        }}
        className="btn btn-sm btn-outline font-thin rounded w-full bg-white border-purple-500 hover:bg-purple-500 hover:border-purple-500 text-purple-500 hover:text-white ">GENERATE</button>
      {authorDigest.length > 0 ? <div className="my-4">
        <ShowItem title="AuthorDigst" content={authorDigest} />
        <button
          onClick={() => { setAuthorDigest('') }}
          className="btn btn-sm btn-outline font-thin rounded w-full bg-white border-purple-500 hover:bg-purple-500 hover:border-purple-500 text-purple-500 hover:text-white ">clear</button>
      </div> : <></>}

      {
        generateTextArea.length > 0 ? <> <textarea
          value={generateTextArea}
          onChange={(e) => setGenerateTextArea(e.target.value)}
          name="" id="" className="mt-1 border border-purple-200 w-full rounded p-2 h-40">
        </textarea>
          <h3 className="p-0 m-0 font-bold text-xs mt-4 text-purple-500">Verify function</h3>
          <button
            onClick={() => {
              try {
                const result = signUtils[currentItem].verify(JSON.parse(generateTextArea));
                result ? toast.success('Verify success') : toast.warning('Verify failed');
              } catch (e) {
                toast.warning('Verify failed');
              }
            }}
            className="btn btn-sm font-thin rounded w-full bg-purple-500 border-0 hover:bg-purple-400">VERIFY</button> </> : <></>
      }

    </div>
  }
  return resultForm;

}

export default MetaSignGeneratorArea;