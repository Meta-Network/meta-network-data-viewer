// import { AuthorPostDigestMetadata, authorPostDigestSign, authorPostDigest } from '@metaio/meta-signature-util';
import * as metaSignatureUtilV1 from '@metaio/meta-signature-util';
import * as metaSignatureUtilV2 from '@metaio/meta-signature-util-v2';
import { deflate } from 'zlib';
// export * as v1 from '@metaio/meta-signature-util';
// export * as v2 from '@metaio/meta-signature-util-v2';

export type AuthorDigestMetadata = metaSignatureUtilV2.AuthorPostDigestMetadata;
export type AuthorDigestMetadataV1 = metaSignatureUtilV1.AuthorPostDigestMetadata;
export * from '@metaio/meta-signature-util-v2';

const initMetaSignatureUtil = (version?: number) => {
  const metaSignatureUtil = version === 2 ? metaSignatureUtilV2 : metaSignatureUtilV1;
  return {
    authorDigest: version === 2 ? metaSignatureUtilV2.authorPostDigest : metaSignatureUtil.authorPostDigest,
    authorDigestSign: version === 2 ? metaSignatureUtilV2.authorPostDigestSign : metaSignatureUtil.authorPostDigestSign,
    ...metaSignatureUtil
  }
}

export default initMetaSignatureUtil;
