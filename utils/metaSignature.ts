import { createContext } from 'react';
import * as metaSignatureUtilV1 from '@metaio/meta-signature-util';
import * as metaSignatureUtilV2 from '@metaio/meta-signature-util-v2';

export * from '@metaio/meta-signature-util';
export type AuthorDigestMetadata = metaSignatureUtilV2.AuthorPostDigestMetadata;
export type AuthorDigestMetadataV1 = metaSignatureUtilV1.AuthorPostDigestMetadata;

export const MetadataVersion = createContext<{ metadataVersion: string, metadataVersionNumber?: number }>({ metadataVersionNumber: 0, metadataVersion: '0' });

const initMetaSignatureUtil = (version: number, versionString?: string) => {
  const metaSignatureUtil = version === 2 ? metaSignatureUtilV2 : metaSignatureUtilV1;
  return {
    authorDigest: version === 2 ? metaSignatureUtilV2.authorPostDigest : metaSignatureUtil.authorPostDigest,
    authorDigestSign: version === 2 ? metaSignatureUtilV2.authorPostDigestSign : metaSignatureUtil.authorPostDigestSign,
    ...metaSignatureUtil
  }
}

export default initMetaSignatureUtil;
