import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ConnectState } from '@/models/connect.d';
import { BLOCK_NAME_CAMEL_CASEApi } from './service';

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
export type ConnectPageState = ConnectState & { BLOCK_NAME_CAMEL_CASE: PartialStateType };

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
  };
  reducers: {
    saveList: ImmerReducer<PartialStateType, AnyAction>;
    saveItem: ImmerReducer<PartialStateType, AnyAction>;
  };
}

const Model: ModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    searchData: {},
    list: [],
    details: {},
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.index, payload);
      yield put({ type: 'saveList', payload: res && Array.isArray(res.data) ? res.data : [] });
      return res;
    },

    *fetchItem({ payload }, { call, put }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.byId, payload);
      yield put({ type: 'saveItem', payload: res && Array.isArray(res.data) ? res.data : [] });
      return res;
    },

    *addItem({ payload }, { call }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.add, payload);
      return !!res;
    },

    *updateItem({ payload }, { call }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.update, payload);
      return !!res;
    },

    *deleteItem({ payload }, { call }) {
      const res = yield call(BLOCK_NAME_CAMEL_CASEApi.destroy, payload);
      return !!res;
    },

    *switchStatus({ payload }, { call, put }) {
      const { enabled, id } = payload;
      const res = yield call(
        enabled ? BLOCK_NAME_CAMEL_CASEApi.disable : BLOCK_NAME_CAMEL_CASEApi.enable,
        id,
      );
      if (!res) return Promise.reject();

      return res;
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.list = payload;
    },
    saveItem(state, { payload }) {
      state.details = payload;
    },
  },
};

export default Model;
