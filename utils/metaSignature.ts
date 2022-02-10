import { AuthorPostDigestMetadata, authorPostDigestSign, authorPostDigest } from '@metaio/meta-signature-util';

export * from '@metaio/meta-signature-util';

export type AuthorDigestMetadata = AuthorPostDigestMetadata;
export const authorDigestSign = authorPostDigestSign;
export const authorDigest = authorPostDigest;