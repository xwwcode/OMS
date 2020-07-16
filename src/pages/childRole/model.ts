import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ConnectState } from '@/models/connect.d';
import { roleList, roleAdd, roleAUpdate, modifyRolePermission } from './service';

export interface ISearchData extends ISearchPageData {
  status?: number | string;
}

export interface StateType {
  list: any[];
  searchData: ISearchData;
  details: any;
}

// 把接口所有参数变为非必填
export type PartialStateType = Partial<StateType>;

// 当前页面可以获取到的model
// 这里只引入了全局的和当前页面级别的model，还没引入一级page目录级别model
export type ConnectPageState = ConnectState & { childRolePage: PartialStateType };

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectPageState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: PartialStateType;
  effects: {
    fetchList: Effect;
    fetchItem: Effect;
    addItem: Effect;
    updateItem: Effect;
    deleteItem: Effect;
    switchStatus: Effect;
    rolePermission: Effect;
  };
  reducers: {
    saveList: ImmerReducer<PartialStateType, AnyAction>;
    saveItem: ImmerReducer<PartialStateType, AnyAction>;
  };
}

const Model: ModelType = {
  namespace: 'childRolePage',

  state: {
    searchData: {},
    list: [],
    details: {},
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(roleList.isApi, payload);
      yield put({
        type: 'saveList',
        payload: res && Array.isArray(res.data.records) ? res.data.records : [],
      });
      return res;
    },

    *fetchItem({ payload }, { call, put }) {
      const res = yield call(roleList.byId, payload);
      yield put({ type: 'saveItem', payload: res && Array.isArray(res.data) ? res.data : [] });
      return res;
    },

    *addItem({ payload }, { call }) {
      const { status } = payload;
      const payloads = payload;
      if (status === true) {
        payloads.status = 1;
      } else {
        payloads.status = 0;
      }
      const res = yield call(roleAdd, payload);
      return !!res;
    },

    *updateItem({ payload }, { call }) {
      const { status } = payload;
      const payloads = payload;
      if (status === true) {
        payloads.status = 1;
      } else {
        payloads.status = 0;
      }
      const res = yield call(roleAUpdate, payload);
      return !!res;
    },

    *deleteItem({ payload }, { call }) {
      const res = yield call(roleList.destroy, payload);
      return !!res;
    },

    *switchStatus({ payload }, { call, put }) {
      const { enabled, id } = payload;
      const res = yield call(enabled ? roleList.disable : roleList.enable, id);
      if (!res) return Promise.reject();

      return res;
    },
    *rolePermission({ payload }, { call }) {
      const res = yield call(modifyRolePermission, payload);
      return !!res;
    },
  },
  reducers: {
    saveList(state, { payload }) {
      const states = state;
      states.list = payload;
    },
    saveItem(state, { payload }) {
      const states = state;
      states.details = payload;
    },
  },
};

export default Model;
