import { useEffect, useState, useMemo } from "react";
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

  const payloadExample = useMemo(() => ({
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
    ],
    serverVerificationSign: {
      "@context": "https://metanetwork.online/ns/cms",
      "type": "server-verification-sign",
      "signatureAlgorithm": "curve25519",
      "version": "2021-11-01-01",
      "publicKey": "0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f",
      "nonce": "0x9156ecb504eeddf5b9d5b67b",
      "claim": "I, meta-cms.vercel.mttk.net authorize request (sign: 0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b) using key: 0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "signature": "0xe2d898b09ae3b94a162bfdb2fc9e0330301c7647d0536291f31cfb69837436162990a35588c5bdd4a11b07653965531dcf4766b22d88562498d409da4f2e1c0e",
      "ts": 1636613485184
    },
    serverVerificationSignWithContent: {
      "@context": "https://metanetwork.online/ns/cms",
      "type": "server-verification-sign",
      "signatureAlgorithm": "curve25519",
      "version": "2021-11-01-01",
      "publicKey": "0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "nonce": "0x9156ecb504eeddf5b9d5b67b", "claim": "I, meta-cms.vercel.mttk.net authorize request (sign: 0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b) using key: 0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "signature": "0xe2d898b09ae3b94a162bfdb2fc9e0330301c7647d0536291f31cfb69837436162990a35588c5bdd4a11b07653965531dcf4766b22d88562498d409da4f2e1c0e", "ts": 1636613485184, "reference": [{ "refer": "bafybeibu4wnm7bymptipt3lyvuyqpirn5ejcfu6gtcw7lcicziibysfpgy", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest", "algorithm": "sha256", "version": "2021-11-01-01", "title": "测试标题修改用的文章-修改标题2", "cover": "", "summary": "测试标题修改用的文章的正文\n\n修改了一次标题\n\n", "content": "测试标题修改用的文章的正文\n\n- 修改了一次标题\n", "license": "", "categories": "", "tags": "", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "ts": 1636613506400 } }, { "refer": "bafybeih4msz5khyyuplw4r327yp4pjx4zxts2ieyheev2yixvl2acbxk5q", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest-sign", "signatureAlgorithm": "curve25519", "version": "2021-11-01-01", "publicKey": "0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "nonce": "0x0a2a7af12935a5a2dc06c71f", "claim": "I authorize publishing by metaspaces.life from this device using key: 0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "signature": "0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b", "ts": 1636613506403 } }]
    },
    authorPublishMetaSpaceRequest: {
      "@context": "https://metanetwork.online/ns/cms",
      "type": "server-verification-sign",
      "signatureAlgorithm": "curve25519",
      "version": "2021-11-01-01",
      "publicKey": "0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "nonce": "0x9156ecb504eeddf5b9d5b67b", "claim": "I, meta-cms.vercel.mttk.net authorize request (sign: 0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b) using key: 0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "signature": "0xe2d898b09ae3b94a162bfdb2fc9e0330301c7647d0536291f31cfb69837436162990a35588c5bdd4a11b07653965531dcf4766b22d88562498d409da4f2e1c0e", "ts": 1636613485184, "reference": [{ "refer": "bafybeibu4wnm7bymptipt3lyvuyqpirn5ejcfu6gtcw7lcicziibysfpgy", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest", "algorithm": "sha256", "version": "2021-11-01-01", "title": "测试标题修改用的文章-修改标题2", "cover": "", "summary": "测试标题修改用的文章的正文\n\n修改了一次标题\n\n", "content": "测试标题修改用的文章的正文\n\n- 修改了一次标题\n", "license": "", "categories": "", "tags": "", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "ts": 1636613506400 } }, { "refer": "bafybeih4msz5khyyuplw4r327yp4pjx4zxts2ieyheev2yixvl2acbxk5q", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest-sign", "signatureAlgorithm": "curve25519", "version": "2021-11-01-01", "publicKey": "0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "nonce": "0x0a2a7af12935a5a2dc06c71f", "claim": "I authorize publishing by metaspaces.life from this device using key: 0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "signature": "0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b", "ts": 1636613506403 } }]
    },
    authorPublishMetaSpaceServerVerificationSign: {
      "@context": "https://metanetwork.online/ns/cms",
      "type": "server-verification-sign",
      "signatureAlgorithm": "curve25519",
      "version": "2021-11-01-01",
      "publicKey": "0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "nonce": "0x9156ecb504eeddf5b9d5b67b", "claim": "I, meta-cms.vercel.mttk.net authorize request (sign: 0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b) using key: 0x7660c1fc42a2d9aa3f0a4551db9e63f169ecfd56571add56622a6e4824162f1f", "signature": "0xe2d898b09ae3b94a162bfdb2fc9e0330301c7647d0536291f31cfb69837436162990a35588c5bdd4a11b07653965531dcf4766b22d88562498d409da4f2e1c0e", "ts": 1636613485184, "reference": [{ "refer": "bafybeibu4wnm7bymptipt3lyvuyqpirn5ejcfu6gtcw7lcicziibysfpgy", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest", "algorithm": "sha256", "version": "2021-11-01-01", "title": "测试标题修改用的文章-修改标题2", "cover": "", "summary": "测试标题修改用的文章的正文\n\n修改了一次标题\n\n", "content": "测试标题修改用的文章的正文\n\n- 修改了一次标题\n", "license": "", "categories": "", "tags": "", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "ts": 1636613506400 } }, { "refer": "bafybeih4msz5khyyuplw4r327yp4pjx4zxts2ieyheev2yixvl2acbxk5q", "body": { "@context": "https://metanetwork.online/ns/cms", "type": "author-digest-sign", "signatureAlgorithm": "curve25519", "version": "2021-11-01-01", "publicKey": "0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "digest": "0xb40d949d3335748a2438fe9006189fe32d17bc072508499a3aad09a8f1dd8a4d", "nonce": "0x0a2a7af12935a5a2dc06c71f", "claim": "I authorize publishing by metaspaces.life from this device using key: 0xcbf139ba234cddf0bbd5c739d3c072bd12779b0e4b6b491a8fd8c9885eb2971f", "signature": "0x1debb726c6d981c16465e98a24362db21c9835590037c6abc57447e4e5a62e9d29791ab521701b6ae6399ad25d3db242268041804156df1fbb1ef49d7cb41f0b", "ts": 1636613506403 } }]
    }


  }), [])

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