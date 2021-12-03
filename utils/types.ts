import {
  BaseSignatureMetadata,
  AuthorPostSignatureMetadata,
  AuthorDigestMetadata,
  PostMetadata,
  BatchGridActionsMetadata,
  AuthorMediaSignatureMetadata
} from '@metaio/meta-signature-util';

export type MetadataPlatform = 'ipfs' | 'arweave' | null;
export type PlatformIdName = 'hash' | 'HASH' | 'cid' | 'CID' | string;
export type PlatformSourceName = 'IPFS Gateway' | 'Arweave node server' | string;
export type MetadataType = BaseSignatureMetadata | AuthorMediaSignatureMetadata | AuthorPostSignatureMetadata | AuthorDigestMetadata | PostMetadata | BatchGridActionsMetadata;