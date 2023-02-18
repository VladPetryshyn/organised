import {Note} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';
import {getFile} from './getFile';

export const getFiles = async (dir: string) => {
  const items = (await RNFetchBlob.fs.ls(dir)).sort();
  const notesData: {[key: string]: Note[]} = {};

  for (let file of items) {
    const f = `${dir}/${file}`;
    if (await RNFetchBlob.fs.isDir(f)) {
      continue;
    }
    const {notes} = await getFile(f);

    const notebook = file.replace('.org', '');
    notesData[notebook] = notes;
  }

  return {notesData};
};
