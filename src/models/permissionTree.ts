/* eslint-disable no-param-reassign */
import { Effect } from 'dva';
import { NoticeIconData } from '@/components/NoticeIcon';
import { premissAll, applicationAll } from '@/services/permissList';

export interface NoticeItem extends NoticeIconData {
  status?: number;
}

export interface permissionModel {
  list: any[];
  appList: any[];
  defaultAppVal: any;
}

export interface PerModelType {
  namespace: 'permission';
  state: permissionModel;
  effects: {
    perList: Effect;
    appLicationList: Effect;
    setDefaultVal: Effect;
  };
  reducers: {
    savePerList: ImmerReducer<permissionModel, AnyAction>;
    saveApplicationList: ImmerReducer<permissionModel, AnyAction>;
    saveDefaultVal: ImmerReducer<permissionModel, AnyAction>;
  };
}

const PerModal: PerModelType = {
  namespace: 'permission',
  state: {
    list: [],
    appList: [],
    defaultAppVal: undefined,
  },

  effects: {
    *perList({ payload }, { call, put }) {
      const res = yield call(premissAll, payload);
      yield put({
        type: 'savePerList',
        payload: res && Array.isArray(res.data) ? res.data : [],
      });
      return res;
    },
    *appLicationList({ payload }, { call, put }) {
      const res = yield call(applicationAll, payload);
      yield put({
        type: 'saveApplicationList',
        payload: res && Array.isArray(res.data) ? res.data : [],
      });
      return res;
    },
    *setDefaultVal({ payload }, { call, put }) {
      const res = payload;
      yield put({
        type: 'saveDefaultVal',
        payload: res || null,
      });
    },
  },

  reducers: {
    savePerList(state, { payload }) {
      state.list = payload;
    },
    saveApplicationList(state, { payload }) {
      const resetData = payload;
      resetData.forEach((item: any) => {
        item.title = item.appName;
        item.key = item.id;
        item.value = item.id;
      });
      state.appList = resetData;
    },
    saveDefaultVal(state, { payload }) {
      state.defaultAppVal = payload;
    },
  },
};

export default PerModal;
