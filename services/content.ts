import axios from "axios";

export async function getContent<TMetadataType>(
  src: string,
  id: string,
  setMetaDataCallback: (data: any, key: string) => boolean) {
  const metadata: TMetadataType = await (await axios.get(`${src.replace(':hash', id)}`, { timeout: 5000 })).data;
}

