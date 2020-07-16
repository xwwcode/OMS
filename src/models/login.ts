/* eslint-disable no-param-reassign */
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { message } from 'antd';

import {
  fakeAccountLogin,
  getFakeCaptcha,
  getSession,
  modifyPassword,
  getUserMessage,
  getUserMenu,
} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

export interface UserPos {
  userId?: number;
  organizationId?: null;
  nickname?: any;
  userName?: string;
  fullName?: string;
  password?: string;
  salt?: string;
  mobile?: string;
  email?: string;
  lastLoginTime?: string;
  lastLoginIp?: string;
  errorCount?: number;
  loginCount?: number;
  state?: any;
  loginSecretKey?: any;
  identityCardNo?: any;
  inviteCode?: any;
  inviterUid?: any;
  createTime?: string;
  regOrigin?: number;
  description?: any;
  birthday?: any;
  sex?: any;
  menus?: [];
  businessId?: any;
  storeId?: any;
  customerId?: number;
  isSuperAdmin?: false;
}
export interface UserPorModel {
  loginMsg?: UserPos;
  isSessionKey?: {};
  menuList?: [];
}

export interface LoginModelType {
  namespace: 'login';
  state: UserPorModel;
  effects: {
    login: Effect;
    getSessions: Effect;
    getCaptcha: Effect;
    logout: Effect;
    modifyPassword: Effect;
    getUserMsg: Effect;
    getUserMenus: Effect;
  };
  reducers: {
    loginMessage: ImmerReducer<UserPorModel, AnyAction>;
    sessionKey: ImmerReducer<UserPorModel, AnyAction>;
    menuData: ImmerReducer<UserPorModel, AnyAction>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    loginMsg: {},
    isSessionKey: {},
    menuList: [],
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { appKey, sessionKey, ...atherParam } = payload;
      const response = yield call(fakeAccountLogin, appKey, sessionKey, atherParam);
      // Login successfully
      if (response) {
        if (response.status === 1) {
          yield put({
            type: 'loginMessage',
            payload: response,
          });
          storage.setItem(STORAGE_KEY.TOKEN, response.data);

          // 获取用户信息
          yield put({ type: 'getUserMsg', payload: response.data.userId });
        }
      } else {
        console.log('登录信息有误');
      }
    },
    *getSessions({ payload }, { call, put }) {
      const response = yield call(getSession, payload);
      if (response) {
        yield put({
          type: 'sessionKey',
          payload: response,
        });
        storage.setItem(STORAGE_KEY.ACCOUNT, response.data);
      }
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      storage.removeItem(STORAGE_KEY.TOKEN);
      storage.removeItem(STORAGE_KEY.USER);
      storage.removeItem(STORAGE_KEY.ACCOUNT);
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
          }),
        );
      }
    },
    *modifyPassword({ payload }, { call, put }) {
      yield call(modifyPassword, payload);
    },
    *getUserMsg({ payload }, { call, put }) {
      const response = yield call(getUserMessage, payload);
      if (response && response.status === 1) {
        storage.setItem(STORAGE_KEY.USER, response.data);
        yield put(
          routerRedux.replace({
            pathname: '/customer/page',
          }),
        );
      }
    },
    *getUserMenus({ payload }, { call, put }) {
      const response = yield call(getUserMenu, payload);
      if (response && response.status === 1 && response.data.length > 0) {
        yield put({
          type: 'menuData',
          payload: response,
        });
      } else {
        message.error('系统未授权，请联系管理员');
        // yield put(
        //   routerRedux.replace({
        //     pathname: '/user/login',
        //   }),
        // );
      }
    },
  },

  reducers: {
    loginMessage(state, { payload }) {
      setAuthority(payload.currentAuthority);
      state.loginMsg = payload.data;
    },
    sessionKey(state, { payload }) {
      state.isSessionKey = payload.data;
    },
    menuData(state, { payload }) {
      state.menuList = payload.data;
    },
  },
};

export default Model;
