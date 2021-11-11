import { VerifyStatus } from '../utils/status';

type VerifyResultProps = {
  status: VerifyStatus;
}

const VerifyResult = (props: VerifyResultProps) => {
  switch (props.status) {
    case VerifyStatus.Verified:
      return <p className="p-1 font-thin my-1 text-xs bg-green-100 rounded text-green-700">verify success.</p>
      break;
    case VerifyStatus.VerificationFailed:
      return <p className="p-1 font-thin my-1 text-xs bg-red-100 rounded text-red-700">verify failure.</p>
      break;
    default:
      return <></>
      break;
  }
}

export default VerifyResult;