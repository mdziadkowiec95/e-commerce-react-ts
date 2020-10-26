/**
 * @description - a function to iterate and map object values
 * @param {Object} obj - an object to map values in
 * @param {Function} cb - a callback function to map single value in the object
 */

export function mapValues<T, R extends {}>(obj: { [k: string]: any }, cb: (obj: any, index: number, key: string) => T) {
  const mappedObj: { [k: string]: T } = {};

  Object.keys(obj).forEach((key, index) => {
    mappedObj[key] = cb(obj[key], index, key);
  });

  return mappedObj as R;
}
