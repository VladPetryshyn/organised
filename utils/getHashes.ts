import RNFetchBlob from 'rn-fetch-blob';
import {getHash} from './getHash';

export const getHashes = async (dir: string) => {
  const items = await RNFetchBlob.fs.ls(dir);
  const hashes: {[key: string]: string} = {};
  for (let file of items) {
    const f = `${dir}/${file}`;
    if (await RNFetchBlob.fs.isDir(f)) {
      continue;
    }

    hashes[file.replace('.org', '')] = await getHash(f);
  }

  return hashes;
};
