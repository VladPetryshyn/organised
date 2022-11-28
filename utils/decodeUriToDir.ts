import RNFetchBlob from 'rn-fetch-blob';

export const decodeUriToDir = (uri: string) =>
  RNFetchBlob.fs.dirs.SDCardDir + '/' + decodeURIComponent(uri).split(':')[2];
