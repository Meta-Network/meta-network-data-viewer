import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ShowItem from "./ShowItem";
import * as signUtils from '@metaio/meta-signature-util';
import * as utils from '@metaio/meta-signature-util/lib/utils';

type GenratorAreaProps = {
  currentItem: string,
  privateKey: string,
  publicKey: string
}

const MetaSignGeneratorArea = (props: GenratorAreaProps) => {

  const { currentItem, privateKey, publicKey } = props;

  const payloadExample = {
    authorDigest: {
      title: 'One testing post',
      categories: 'Meta Network,Testing',
      content: 'Some post content here...May be very long...',
      cover: 'https://cover.url.com/',
      license: 'CC BY 4.0',
      summary: 'Some post content here...',
      tags: 'Testing Tag, UnitTest',
    },
    authorDigestSign: {
      domain: 'metaspace.life'
    },
    authorMediaSign: {
      title: "Remi's avatar",
      categories: 'avatar',
      cover:
        'https://storageapi.fleek.co/andoroyur-team-bucket/metanetwork/users/metaio-storage/68253563.jpeg',
      license: 'CC BY 4.0',
      tags: 'remi,avatar',
      platform: 'ipfs',
      contentType: 'image/jpeg',
      platformHash: 'QmTYKshXksysKCuC4R4AaSuvUz4TyHf6UEgT676Y6Gni9r',
    },
    metaNetworkGridsServerSign: [
      {
        id: 1,
        siteName: '',
        x: 0,
        y: 11,
        z: -11,
        userId: 14,
        username: 'andoroyur',
        userNickname: 'BenBen43 🌟',
        userBio: '中文介绍123',
        userAvatar: 'https://metaspace.federarks.xyz/images/logo2.png',
        subdomain: 'andoroyur19.metaspaces.life',
        metaSpaceSiteId: 114,
        metaSpaceSiteUrl: 'https://andoroyur19.metaspaces.life',
        metaSpaceSiteProofUrl: '',
        inviterUserId: 0,
      },
      {
        id: 5,
        siteName: '',
        x: 0,
        y: 12,
        z: -12,
        userId: 33,
        username: '',
        userNickname: '',
        userBio: '',
        userAvatar: 'https://i.loli.net/2021/05/13/CiEFPgWJzuk5prZ.png',
        subdomain: '',
        metaSpaceSiteId: 0,
        metaSpaceSiteUrl: '',
        metaSpaceSiteProofUrl: '',
        inviterUserId: 0,
      },
    ]

  }

  let resultForm = <></>;
  const [generateTextArea, setGenerateTextArea] = useState<string>('');
  const [verifyTextArea, setVerifyTextArea] = useState<string>('');
  const [payload, setPayload] = useState<string>('');

  const [authorDigest, setAuthorDigest] = useState<string>('');

  useEffect(() => {
    setPayload(JSON.stringify(payloadExample[currentItem] || { "message": "no test unit." }, null, 2));
    setGenerateTextArea('');
    setVerifyTextArea('');
  }, [currentItem])

  if (currentItem.toLowerCase() == 'help') {
    resultForm = <>Help!!</>;
  } else {
    resultForm = <div>
      {authorDigest.length > 0 ? <div className="my-4">
        <ShowItem title="AuthorDigst" content={authorDigest} />
        <button
          onClick={() => { setAuthorDigest('') }}
          className="btn btn-sm font-thin w-full bg-purple-500 border-0 hover:bg-purple-400">clear</button>
      </div> : <></>}

      <h3 className="p-0 m-0 font-bold text-xs text-purple-500">Payload</h3>
      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        name="" id="" className="mt-1 border border-purple-200 w-full rounded-lg p-2 h-40">
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

        }}
        className="btn btn-sm font-thin w-full bg-purple-500 border-0 hover:bg-purple-400">GENERATE</button>
      <textarea
        value={generateTextArea}
        onChange={(e) => setGenerateTextArea(e.target.value)}
        name="" id="" className="mt-1 border border-purple-200 w-full rounded-lg p-2 h-40">
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
        className="btn btn-sm font-thin w-full bg-purple-500 border-0 hover:bg-purple-400">VERIFY</button>
    </div>
  }
  return resultForm;

}

export default MetaSignGeneratorArea;