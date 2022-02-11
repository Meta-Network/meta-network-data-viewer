import { BaseSignatureMetadata, AuthorDigestMetadata, BatchGridActionsMetadata, AuthorMediaSignatureMetadata } from '../utils/metaSignature';
import { MetadataType } from '../utils/types';

import SignatureMetadataValidation from './Validations/SignatureMetadataValidation';
import AuthorDigestRequestMetadataValidation from './Validations/AuthorDigestRequestMetadataValidation';
import AuthorPublishMetaSpaceRequestMetadataSignatureValidation from './Validations/AuthorPublishMetaSpaceRequestMetadataSignatureValidation';
import MetaNetworkGridsServerSignValidations from './Validations/MetaNetworkGridsServerSignValidations';
import AuthorMediaSignatureMetadataValidation from './Validations/AuthorMediaSignatureMetadataValidation';
interface ICustomerValidations {
  metadata: MetadataType
}

interface IReference {
  refer: string;
  rel: string;
  body: BaseSignatureMetadata & AuthorDigestMetadata;
}

const CustomerValidations = (props: ICustomerValidations) => {

  const { metadata } = props;
  if ((metadata as BaseSignatureMetadata).reference && (metadata as BaseSignatureMetadata).reference.length > 0) {
    const signatureMetadata: BaseSignatureMetadata = metadata as BaseSignatureMetadata;
    return <>
      {
        signatureMetadata.reference.map((item: IReference, index) => {
          const { body, refer } = item;
          if (signatureMetadata["@type"] != 'author-publish-meta-space-server-verification-sign' && body.signature && body.signature.length > 0) {
            return <div key={index}>
              <SignatureMetadataValidation metadata={body} refer={refer} />
            </div>
          } else if (signatureMetadata["@type"] === 'author-publish-meta-space-server-verification-sign' && body.signature && body.signature.length > 0) {
            return <div key={index}>
              <AuthorPublishMetaSpaceRequestMetadataSignatureValidation metadata={body} refer={refer} />
            </div>
          } else if (body.digest && body.digest.length > 0) {
            return <div key={index}>
              <AuthorDigestRequestMetadataValidation metadata={body} refer={refer} />
            </div>
          } else {
            return <div key={index}></div>
          }
        })
      }
    </>;
  } else if ((metadata as BatchGridActionsMetadata)['@type'] === 'meta-network-grids-server-sign') {
    const batchGridActionsMetadata: BatchGridActionsMetadata = metadata as BatchGridActionsMetadata;
    return <>
      <MetaNetworkGridsServerSignValidations metadata={batchGridActionsMetadata} />
    </>;
  } else if ((metadata as AuthorMediaSignatureMetadata)['@type'] === 'author-media-sign') {
    const authorMediaSignatureMetadata: AuthorMediaSignatureMetadata = metadata as AuthorMediaSignatureMetadata;
    console.log(`authorMediaSignatureMetadata`);
    return <>
      <AuthorMediaSignatureMetadataValidation metadata={authorMediaSignatureMetadata} />
    </>;
  } else {
    return <></>;
  }
}

export default CustomerValidations;