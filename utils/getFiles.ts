import {Note, orgToJson} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';

export const getFiles = async (dir: string) => {
  const items = (await RNFetchBlob.fs.ls(dir)).sort();
  const notesData: {[key: string]: Note[]} = {};

  for (let file of items) {
    const f = `${dir}/${file}`;
    if (await RNFetchBlob.fs.isDir(f)) {
      continue;
    }
    const {notes} = orgToJson(await RNFetchBlob.fs.readFile(f, 'utf8'));

    const notebook = file.replace('.org', '');
    notesData[notebook] = notes;
  }

  return {notesData};
};
