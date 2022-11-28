export const indexOf = <T>(array: Array<T>, func: (item: T) => boolean) => {
  for (const idx in array) {
    if (func(array[idx])) {
      return +idx;
    }
  }

  return -1;
};
