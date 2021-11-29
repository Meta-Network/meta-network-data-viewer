import {
  SignatureMetadata,
  AuthorSignatureMetadata,
  AuthorDigestMetadata,
  PostMetadata,
  BatchGridActionsMetadata
} from '@metaio/meta-signature-util';

export type MetadataPlatform = 'ipfs' | 'arweave';
export type PlatformIdName = 'hash' | 'HASH' | 'cid' | 'CID' | string;
export type PlatformSourceName = 'IPFS Gateway' | 'Arweave node server' | string;

export type MetadataType = SignatureMetadata | AuthorSignatureMetadata | AuthorDigestMetadata | PostMetadata | BatchGridActionsMetadata;