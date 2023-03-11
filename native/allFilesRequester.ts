import {NativeModules} from 'react-native';

const {PermissionFile} = NativeModules;

interface PermissionFile {
  checkPermission: (callback: (result: boolean) => void) => void;
  checkAndGrantPermission: (
    errorCallback: (result: boolean) => void,
    resultCallback: (result: boolean) => void,
  ) => void;
}

export default PermissionFile as PermissionFile;
