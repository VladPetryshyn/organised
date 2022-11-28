import {orgToJson} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';

export const getFile = async (path: string) => {
  const file = await RNFetchBlob.fs.readFile(path, 'utf8');
  return orgToJson(file);
};
