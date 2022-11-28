import RNFetchBlob from 'rn-fetch-blob';

export const getHashes = async (dir: string) => {
  const items = await RNFetchBlob.fs.ls(dir);
  const hashes: {[key: string]: string} = {};
  for (let file of items) {
    const f = `${dir}/${file}`;
    if (await RNFetchBlob.fs.isDir(f)) {
      continue;
    }

    hashes[file.replace('.org', '')] = await RNFetchBlob.fs.hash(f, 'sha1');
  }

  return hashes;
};
