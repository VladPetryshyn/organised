import RNFetchBlob from 'rn-fetch-blob';

export const getHash = async (path: string) =>
  await RNFetchBlob.fs.hash(path, 'sha512');
