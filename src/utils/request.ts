/* eslint-disable no-param-reassign */
import umiRequest, { extend, RequestOptionsInit } from 'umi-request';
import { notification, message } from 'antd';
import { routerRedux } from 'dva/router';
import md5 from 'blueimp-md5';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { Helper } from '@/utils/helper';

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '该操作需要登录后才能继续进行',
  403: '当前用户权限不足，不能继续执行',
  404: '指定的功能不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  423: '指定的功能被锁定',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const INTERFACE_VERSION = '1.0';

const signMd5 = (str: string) => md5(str);

const handeErrorStatus = (status: number, response?: Response, errorMsg?: string) => {
  const { dispatch } = window.g_app._store;
  let reqUrl;
  if (response) {
    reqUrl = response.url;
  }

  const errorText = codeMessage[status];

  switch (status) {
    case 401:
      dispatch({ type: 'login/logout' });
      break;
    case 402:
      // 刷新令牌
      dispatch({ type: 'login/refreshToken' });
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        notification.error({
          message: `请求错误 ${status}: ${reqUrl}`,
          description: errorText,
        });
      } else if (!errorMsg) {
        message.error(errorText);
      }
  }

  if (errorMsg) {
    message.error(errorMsg);
  }
};

// 判断登录是否过期
const checkLoginOut = (code: string): void => {
  const requestCode = ['USER_NOT_LOGIN'];
  if (requestCode.includes(code)) {
    storage.removeItem(STORAGE_KEY.ACCOUNT);
    storage.removeItem(STORAGE_KEY.USER);
    storage.removeItem(STORAGE_KEY.TOKEN);
    setTimeout(() => {
      /* eslint no-underscore-dangle: 0 */
      window.g_app._store.dispatch(routerRedux.push('/user/login'));
    }, 0);
  }
};
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    handeErrorStatus(response.status, response);
  }
  return response;
};

const getAuthorization = () => {
  /* eslint no-underscore-dangle: 0 */
  const { getState } = window.g_app._store;
  const {
    user: { token },
  } = getState();
  if (token && token.accessToken) {
    return `Bearer ${token.accessToken}`;
  }

  return '';
};

/**
 * 不同环境的Api处理
 */
const checkApi = () => {
  const apis = [
    'https://boss-api-dev.myutopa.com',
    'https://boss-api-test.myutopa.com',
    'https://boss-api-pre.myutopa.com',
    'https://boss-api.myutopa.com',
  ];
  switch (window.location.host) {
    case 'auth-test.myutopa.com':
      return apis[1];
    case 'auth-pre.myutopa.com':
      return apis[2];
    case 'auth.myutopa.com':
      return apis[3];
    default:
      return apis[0];
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  // headers: {
  //   'Content-Type': 'application/json-patch+json',
  // },
  prefix: checkApi(),
});

const signFnc = function(url) {
  const INTERFACE_TIMESTAMP = Math.floor(Date.now() / 1000);
  // 需要加密的参数  生成签名
  let requestUrl = url;

  let md5Obj = {
    appKey: storage.getItem(STORAGE_KEY.ACCOUNT).appKey,
    sessionKey: storage.getItem(STORAGE_KEY.ACCOUNT).sessionKey,
    accessToken: storage.getItem(STORAGE_KEY.TOKEN)
      ? storage.getItem(STORAGE_KEY.TOKEN).accessToken
      : '',
    timestamp: INTERFACE_TIMESTAMP,
    ver: INTERFACE_VERSION,
  };
  if (
    !requestUrl.includes('/eshop/core/account/login/doLogin') &&
    !requestUrl.includes('/eshop/core/account/session/genSession')
  ) {
    if (requestUrl.includes('?')) {
      const interfaceUrl = requestUrl.split('?')[0]; // 截取接口
      const interfaceParam = requestUrl.split('?')[1]; // 接口参数
      // 参数处理
      let paramSplit = [];
      if (interfaceParam.includes('&')) {
        paramSplit = interfaceParam.split('&');
      } else {
        paramSplit.push(interfaceParam);
      }

      paramSplit.forEach(item => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        const obj = {};
        obj[key] = value;
        md5Obj = Object.assign(md5Obj, obj);
      });

      let md5Str = '';
      // 参数按首字母排序
      Object.keys(Helper.deepSort(md5Obj)).forEach((i, index) => {
        if (
          Object.values(Helper.deepSort(md5Obj))[index] !== null &&
          Object.values(Helper.deepSort(md5Obj))[index] !== ''
        ) {
          md5Str += i + Object.values(Helper.deepSort(md5Obj))[index];
        }
      });
      // md5加密
      const enCode = signMd5(
        storage.getItem(STORAGE_KEY.ACCOUNT).sessionSecret +
          md5Str +
          storage.getItem(STORAGE_KEY.ACCOUNT).sessionSecret,
      ).toUpperCase();

      requestUrl = `${interfaceUrl}?appKey=${
        storage.getItem(STORAGE_KEY.ACCOUNT).appKey
      }&sessionKey=${storage.getItem(STORAGE_KEY.ACCOUNT).sessionKey}&accessToken=${
        storage.getItem(STORAGE_KEY.TOKEN).accessToken
      }&ver=${INTERFACE_VERSION}&timestamp=${INTERFACE_TIMESTAMP}&sign=${enCode}&${interfaceParam}`;
    } else {
      let md5Str = '';
      // 参数按首字母排序
      Object.keys(Helper.deepSort(md5Obj)).forEach((i, index) => {
        if (
          Object.values(Helper.deepSort(md5Obj))[index] !== null &&
          Object.values(Helper.deepSort(md5Obj))[index] !== ''
        ) {
          md5Str += i + Object.values(Helper.deepSort(md5Obj))[index];
        }
      });
      // md5加密
      const enCode = signMd5(
        storage.getItem(STORAGE_KEY.ACCOUNT).sessionSecret +
          md5Str +
          storage.getItem(STORAGE_KEY.ACCOUNT).sessionSecret,
      ).toUpperCase();

      requestUrl = `${requestUrl}?appKey=${
        storage.getItem(STORAGE_KEY.ACCOUNT).appKey
      }&sessionKey=${storage.getItem(STORAGE_KEY.ACCOUNT).sessionKey}&accessToken=${
        storage.getItem(STORAGE_KEY.TOKEN).accessToken
      }&ver=${INTERFACE_VERSION}&timestamp=${INTERFACE_TIMESTAMP}&sign=${enCode}`;
    }
  }
  return requestUrl;
};

request.interceptors.request.use((url, options) => {
  if (options && options.headers) {
    options.headers = {
      ...options.headers,
      Authorization: getAuthorization(),
    };
  }
  if (storage.getItem(STORAGE_KEY.ACCOUNT)) {
    console.log('STORAGE_KEY.ACCOUNT');
    return {
      url: signFnc(url),
      options,
    };
  }
  return {
    url,
    options,
  };
});

// 拦截器
request.interceptors.response.use(async (response, options) => {
  let error;
  let cloneResponse;
  let json;
  try {
    cloneResponse = await response.clone();
    json = await cloneResponse.json();
  } catch (e) {
    return response;
  }
  if (json.status !== 1 || (json.data && json.data.errors && json.data.errors)) {
    const errorMsg = json.message;
    if (errorMsg.length < 100) {
      message.error(errorMsg); // 提示错误
    } else if (errorMsg.length > 100) {
      notification.error({
        message: '错误',
        description: errorMsg.slice(0, 500),
      });
    }

    error = new Error(errorMsg);
    // if (errorMsg === '你没有权限访问或你的票据已经过期。') {
    //   onLogout();
    // }
  }
  if (error) {
    console.error(error);
  }
  if (json.status === 1 && (options as CustomRequestOptionsInit).successMsg) {
    message.success(json.message || (options as CustomRequestOptionsInit).successMsg);
  } else if (json.code > 200) {
    handeErrorStatus(json.code, response, json.message);
  }

  // checkLoginOut(json.code);

  // 只暴露data参数，其它拦截器统一处理
  return error ? null : json || {};
});

export interface CustomRequestOptionsInit extends RequestOptionsInit {
  successMsg?: string;
}

export default request;

const handlerTextData = (data: CustomRequestOptionsInit['body']) => {
  // 加上双引号
  if (typeof data === 'string') return `"${data}"`;
  return data;
};

export function $get(url: string, params?: {}, options?: CustomRequestOptionsInit) {
  return request(url, { ...options, params: { ...params } });
}

export function $posts(url: string, options?: CustomRequestOptionsInit) {
  return request(url, {
    ...options,
    method: 'POST',
  });
}

export function $post(url: string, data: any, options?: CustomRequestOptionsInit) {
  return request(url, {
    ...options,
    method: 'POST',
    data: handlerTextData(data),
  });
}

export function $put(url: string, data: any, options?: CustomRequestOptionsInit) {
  return request(url, {
    ...options,
    method: 'PUT',
    data: handlerTextData(data),
  });
}

export function $delete(url: string, data: any, options?: CustomRequestOptionsInit) {
  return request(url, {
    ...options,
    method: 'DELETE',
    body: handlerTextData(data),
  });
}

export function $postFormData(url: string, data: any, options?: CustomRequestOptionsInit) {
  const formData = new FormData();
  if (data && typeof data === 'object') {
    Object.keys(data).forEach(k => {
      formData.append(k, data[k]);
    });
  }
  return umiRequest(url, {
    ...options,
    method: 'POST',
    data: formData,
    credentials: 'include',
    headers: {
      Authorization: getAuthorization(),
    },
  });
}

// export function requestByUrl(params = {}) {
//   return request(handlerUrl(params.url), {
//     method: params.method || 'GET',
//     body: params,
//   });
// }
