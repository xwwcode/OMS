/* eslint-disable no-param-reassign */
import { Effect } from 'dva';
// import { customerAndPageApi } from '@/pages/customer/Page/service'
import { NoticeIconData } from '@/components/NoticeIcon';
import { roleAll } from '@/services/RoleList';

export interface NoticeItem extends NoticeIconData {
  status?: number;
}

export interface RoleModelState {
  list: any[];
  submitParams: any[];
}

export interface RoleModelType {
  namespace: 'role';
  state: RoleModelState;
  effects: {
    roleList: Effect;
    fetchParams: Effect;
  };
  reducers: {
    saveRoleList: ImmerReducer<RoleModelState, AnyAction>;
    isParams: ImmerReducer<RoleModelState, AnyAction>;
  };
}

const RoleModal: RoleModelType = {
  namespace: 'role',
  state: {
    list: [],
    submitParams: [],
  },

  effects: {
    *roleList({ payload }, { call, put }) {
      const res = yield call(roleAll, payload);
      yield put({
        type: 'saveRoleList',
        payload: Array.isArray(res.data) ? res.data : [],
      });
      return res;
    },
    *fetchParams({ payload }, { call, put }) {
      yield put({
        type: 'isParams',
        payload,
      });
    },
  },

  reducers: {
    saveRoleList(state, { payload }) {
      state.list = payload;
    },
    isParams(state, { payload }) {
      state.submitParams = payload;
    },
  },
};

export default RoleModal;
