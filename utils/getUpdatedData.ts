import {Notes, orgToJson} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';
import mergeWith from 'lodash.mergewith';
import {tagsReducerStateI} from '../redux/tagsReducer';

export const getUpdatedData = async (directory: string, files: string[]) => {
  const noteData: {[k: string]: Notes} = {};
  const tagsData: tagsReducerStateI = {notebooks: {}, count: {}};

  for (const file of files) {
    const {notes, tags} = orgToJson(
      await RNFetchBlob.fs.readFile(`${directory}/${file}.org`, 'utf8'),
    );
    noteData[file] = notes;
    tagsData.notebooks[file] = tags;
    mergeWith(tagsData.count, tags, (ov: any, sv: any) =>
      !isNaN(ov) ? ov + sv : undefined,
    );
  }

  return {noteData, tagsData};
};
