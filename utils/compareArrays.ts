export const compareArrays = (arr1: Array<any>, arr2: Array<any>) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (const i in arr1) {
    if (arr1[i] === arr2[i]) {
      continue;
    }
    return false;
  }

  return true;
};
