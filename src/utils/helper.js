/**
 * Created by skz on 2017/10/10 18:03
 * Common Method
 */
// eslint-disable-next-line no-underscore-dangle
const _toString = Object.prototype.toString;

export const Helper = {
  isObject(obj) {
    return obj !== null && typeof obj === 'object';
  },
  isArray(arr) {
    return _toString.call(arr) === '[object Array]';
  },
  sort(val) {
    const keys = Object.keys(val).sort();
    const sortParam = {};
    keys.forEach((key, index) => {
      sortParam[key] = val[key];
    });
    return sortParam;
  },
  deepSort(params) {
    // eslint-disable-next-line no-restricted-syntax
    for (const k in params) {
      if (this.isArray(params[k])) {
        // 数组
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < params[k].length; i++) {
          if (this.isObject(params[k][i])) {
            params[k][i] = this.deepSort(params[k][i]);
          }
        }
      } else if (this.isObject(params[k])) {
        // JSON
        params[k] = this.deepSort(params[k]);
      }
    }
    return this.sort(params);
  },
};
