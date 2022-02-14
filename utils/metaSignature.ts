import { createContext } from 'react';
import * as metaSignatureUtilV1 from '@metaio/meta-signature-util';
import * as metaSignatureUtilV2 from '@metaio/meta-signature-util-v2';

export * from '@metaio/meta-signature-util';
export type AuthorDigestMetadata = metaSignatureUtilV2.AuthorPostDigestMetadata;
export type AuthorDigestMetadataV1 = metaSignatureUtilV1.AuthorPostDigestMetadata;

export const MetadataVersion = createContext<{ metadataVersion: string, metadataVersionNumber?: number }>({ metadataVersionNumber: 0, metadataVersion: '0' });

const initMetaSignatureUtil = (version: number | string) => {
  let metadataVersion: number;

  if (typeof version === 'string') {
    metadataVersion = (Number(version?.split('.')[0]) >= 2) ? 2 : 1
  } else if (typeof version === 'number') {
    metadataVersion = version >= 2 ? 2 : 1;
  }

  const metaSignatureUtil = metadataVersion === 2 ? metaSignatureUtilV2 : metaSignatureUtilV1;
  return {
    authorDigest: metadataVersion === 2 ? metaSignatureUtilV2.authorPostDigest : metaSignatureUtil.authorPostDigest,
    authorDigestSign: metadataVersion === 2 ? metaSignatureUtilV2.authorPostDigestSign : metaSignatureUtil.authorPostDigestSign,
    ...metaSignatureUtil
  }
}

export default initMetaSignatureUtil;
