import { SignatureMetadata, AuthorDigestRequestMetadata } from '@metaio/meta-signature-util/type/types';

import SignatureMetadataValidation from './SignatureMetadataValidation';
import AuthorDigestRequestMetadataValidation from './AuthorDigestRequestMetadataValidation';
import AuthorPublishMetaSpaceRequestMetadataSignatureValidation from './AuthorPublishMetaSpaceRequestMetadataSignatureValidation';
interface ICustomerValidations {
  metadata: SignatureMetadata
}

interface IReference {
  refer: string;
  body: SignatureMetadata & AuthorDigestRequestMetadata;
}

const CustomerValidations = (props: ICustomerValidations) => {

  const { metadata } = props;

  return <>
    {
      metadata.reference.map((item: IReference, index) => {
        const { body, refer } = item;
        if (metadata.type != 'author-publish-meta-space-server-verification-sign' && body.signature && body.signature.length > 0) {
          return <div key={index}>

            <SignatureMetadataValidation metadata={body} refer={refer} />
          </div>
        } else if (metadata.type === 'author-publish-meta-space-server-verification-sign' && body.signature && body.signature.length > 0) {
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
}

export default CustomerValidations;