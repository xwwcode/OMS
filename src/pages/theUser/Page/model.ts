/* eslint-disable no-param-reassign */
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ConnectState } from '@/models/connect.d';
import {
  userItem,
  userAdd,
  userUpdate,
  resetPassWords,
  handOvers,
  saveAllRole,
  userDropDownList,
} from './service';

export interface ISearchData extends ISearchPageData {
  status?: number | string;
}

export interface StateType {
  list: any[];
  searchData: ISearchData;
  details: any;
  roleList: any[];
  userList: any[];
}

// 把接口所有参数变为非必填
export type PartialStateType = Partial<StateType>;

// 当前页面可以获取到的model
// 这里只引入了全局的和当前页面级别的model，还没引入一级page目录级别model
export type ConnectPageState = ConnectState & { theUserAndPage: PartialStateType };

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
    resetPassword: Effect;
    roleLis: Effect;
    handOver: Effect;
    distributionRole: Effect;
    dropList: Effect;
  };
  reducers: {
    saveList: ImmerReducer<PartialStateType, AnyAction>;
    saveItem: ImmerReducer<PartialStateType, AnyAction>;
    saveRoleLis: ImmerReducer<PartialStateType, AnyAction>;
    saveDropList: ImmerReducer<PartialStateType, AnyAction>;
  };
}

const Model: ModelType = {
  namespace: 'theUserAndPage',

  state: {
    searchData: {},
    list: [],
    details: {},
    roleList: [],
    userList: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const res = yield call(userItem, payload);
      yield put({
        type: 'saveList',
        payload: res && Array.isArray(res.data.records) ? res.data.records : [],
      });
      return res;
    },

    *fetchItem({ payload }, { call, put }) {
      const res = yield call(userItem.byId, payload);
      yield put({ type: 'saveItem', payload: res && Array.isArray(res.data) ? res.data : [] });
      return res;
    },

    *addItem({ payload }, { call }) {
      const { status } = payload;
      if (status === true) {
        payload.status = 1;
      } else {
        payload.status = 0;
      }
      const res = yield call(userAdd, payload);
      return !!res;
    },

    *updateItem({ payload }, { call }) {
      const { status } = payload;
      if (status === true) {
        payload.status = 1;
      } else {
        payload.status = 0;
      }
      const res = yield call(userUpdate, payload);
      return !!res;
    },

    *deleteItem({ payload }, { call }) {
      const res = yield call(userItem.destroy, payload);
      return !!res;
    },

    *switchStatus({ payload }, { call, put }) {
      const { enabled, id } = payload;
      const res = yield call(enabled ? userItem.disable : userItem.enable, id);
      if (!res) return Promise.reject();
      return res;
    },
    *resetPassword({ payload }, { call }) {
      const res = yield call(resetPassWords, payload);
      console.log(res, '---yieldres-');
      return res;
    },
    *handOver({ payload }, { call }) {
      const res = yield call(handOvers, payload);
      return !!res;
    },
    *roleLis({ payload }, { call, put }) {
      const res = {
        data: [
          {
            roleId: 1,
            roleName: '角色一',
          },
          {
            roleId: 2,
            roleName: '角色二',
          },
          {
            roleId: 3,
            roleName: '角色三',
          },
          {
            roleId: 4,
            roleName: '角色四',
          },
        ],
      };
      yield put({ type: 'saveRoleLis', payload: res && Array.isArray(res.data) ? res.data : [] });
      return res;
    },
    *distributionRole({ payload }, { call, put }) {
      const res = yield call(saveAllRole, payload);
      return !!res;
    },
    *dropList({ payload }, { call, put }) {
      const res = yield call(userDropDownList, payload);
      yield put({
        type: 'saveDropList',
        payload: res && Array.isArray(res.data) ? res.data : [],
      });
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
    saveRoleLis(state, { payload }) {
      state.roleList = payload;
    },
    saveDropList(state, { payload }) {
      state.userList = payload;
    },
  },
};

export default Model;
