import {Note, orgToJson} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';
import mergeWith from 'lodash.mergewith';
import {tagsReducerStateI} from '../redux/tagsReducer';

export const getFiles = async (dir: string) => {
  const items = (await RNFetchBlob.fs.ls(dir)).sort();
  const notesData: {[key: string]: Note[]} = {};
  const tagsData: tagsReducerStateI = {notebooks: {}, count: {}};

  for (let file of items) {
    const f = `${dir}/${file}`;
    if (await RNFetchBlob.fs.isDir(f)) {
      continue;
    }
    const {notes, tags} = orgToJson(await RNFetchBlob.fs.readFile(f, 'utf8'));

    const notebook = file.replace('.org', '');
    notesData[notebook] = notes;
    tagsData.notebooks[notebook] = tags;
    mergeWith(tagsData.count, tags, (ov: any, sv: any) =>
      !isNaN(ov) ? ov + sv : undefined,
    );
  }

  return {notesData, tagsData};
};
