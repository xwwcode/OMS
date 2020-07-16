/* eslint-disable no-param-reassign */
import { Effect } from 'dva';
// import { customerAndPageApi } from '@/pages/customer/Page/service'
import { NoticeIconData } from '@/components/NoticeIcon';
import { appList } from '@/services/appLication';

export interface NoticeItem extends NoticeIconData {
  status?: number;
}

export interface appModel {
  list: any[];
}

export interface PerModelType {
  namespace: 'appLication';
  state: appModel;
  effects: {
    appList: Effect;
  };
  reducers: {
    saveAppList: ImmerReducer<appModel, AnyAction>;
  };
}

const AppLicationModal: PerModelType = {
  namespace: 'appLication',
  state: {
    list: [],
  },

  effects: {
    *appList({ payload }, { call, put }) {
      const res = yield call(appList, payload);
      yield put({
        type: 'saveAppList',
        payload: Array.isArray(res.data) ? res.data : [],
      });
    },
  },

  reducers: {
    saveAppList(state, { payload }) {
      state.list = payload;
    },
  },
};

export default AppLicationModal;
