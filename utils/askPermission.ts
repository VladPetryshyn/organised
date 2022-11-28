import {Linking, PermissionsAndroid} from 'react-native';

export const checkPermissions = async () => {
  return (
    await Promise.all([
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ),
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ),
    ])
  ).reduce((acc, curr) => acc && curr);
};

export const requestPermissions = async () => {
  return (
    await Promise.all([
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ),
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ),
    ])
  ).reduce((acc, curr) => acc && curr);
};
