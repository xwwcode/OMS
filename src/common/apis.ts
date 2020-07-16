const sysAppKey = {
  DEV_APPKEY: 'a4cb9e1311074a8dbce1df12bde428e6', // 开发环境appKey
  TEST_APPKEY: 'a4cb9e1311074a8dbce1df12bde428e6', // 测试环境appKey
  PRE_APPKEY: 'a4cb9e1311074a8dbce1df12bde428e6', // 高保真appKey
  PROD_APPKEY: 'a4cb9e1311074a8dbce1df12bde428e6', // 生产环境appKey
};

const execute = function() {
  let result = 'dev';
  try {
    const executeVal = /((boss)-?(dev|test|pre)?)/gm.exec(document.location.href);
    result = executeVal ? executeVal.length && executeVal[3] : result;
  } catch (e) {
    console.log(e);
  }
  return result;
};

export const appKeys = function() {
  const env = execute();
  let appKey = sysAppKey.DEV_APPKEY;
  switch (env) {
    case 'dev':
      appKey = sysAppKey.DEV_APPKEY;
      break;
    case 'test':
      appKey = sysAppKey.TEST_APPKEY;
      break;
    case 'pre':
      appKey = sysAppKey.PRE_APPKEY;
      break;
    case 'prod':
      appKey = sysAppKey.PROD_APPKEY;
      break;
    default:
      break;
  }
  return appKey;
};
