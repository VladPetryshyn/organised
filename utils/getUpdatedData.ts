import {Notes, orgToJson} from 'org2json';
import RNFetchBlob from 'rn-fetch-blob';

export const getUpdatedData = async (directory: string, files: string[]) => {
  const noteData: {[k: string]: Notes} = {};

  for (const file of files) {
    const {notes} = orgToJson(
      await RNFetchBlob.fs.readFile(`${directory}/${file}.org`, 'utf8'),
    );
    noteData[file] = notes;
  }

  return {noteData};
};
