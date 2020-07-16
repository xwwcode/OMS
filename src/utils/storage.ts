import { STORAGE_KEY } from '@/common/storage';

// export enum STORAGE_KEY {
//   TOKEN = 'token',
// }

// 在这里写了一些方法后，可以在获取和存入的时候做一点操作
const keyCallback = {};

type StorageKey = STORAGE_KEY;

const getKeyCallback = (key: string) => Reflect.has(keyCallback, key) && keyCallback[key];

const handlerGet = (key: string, value: any) => {
  const callback = getKeyCallback(key);
  if (callback && callback.get) {
    return callback.get(value);
  }
  return value;
};

const handlerSet = (key: string, value: any) => {
  const callback = getKeyCallback(key);
  if (callback && callback.set) {
    return callback.set(value);
  }
  return value;
};

const getItem = (key: StorageKey) => {
  const jsonStr = localStorage.getItem(key.toString());
  return handlerGet(key, jsonStr ? JSON.parse(jsonStr).data : null);
};

const removeItem = (key: StorageKey) => window.localStorage.removeItem(key);

const setItem = (key: StorageKey, value: any) => {
  // 用多一层包起来，确保每一项都是json
  const valueStr = JSON.stringify({
    data: handlerSet(key, value),
  });

  const k = key.toString();
  try {
    window.localStorage.setItem(k, valueStr);
  } catch (e) {
    // TODO 超出localstorage容量限制
    // 且删除localStorage重复的数据
    removeItem(k as StorageKey);
  }
};

const clear = () => {
  window.localStorage.clear();
};

export default {
  getItem,
  setItem,
  removeItem,
  clear,
};
