import { Effect } from 'dva';
// import { customerAndPageApi } from '@/pages/customer/Page/service'
import { NoticeIconData } from '@/components/NoticeIcon';
import { queryList } from '@/services/customer';

export interface NoticeItem extends NoticeIconData {
  status?: number;
}

export interface CustomerMessage {
  list: any[];
}

export interface CustomerModelType {
  namespace: 'customer';
  state: CustomerMessage;
  effects: {
    customerList: Effect;
  };
  reducers: {
    saveList: ImmerReducer<CustomerMessage, AnyAction>;
  };
}

const CustomerModal: CustomerModelType = {
  namespace: 'customer',

  state: {
    list: [],
  },

  effects: {
    *customerList({ payload }, { call, put }) {
      const res = yield call(queryList);
      yield put({
        type: 'saveList',
        payload: Array.isArray(res.data) ? res.data : [],
      });
    },
  },

  reducers: {
    saveList(state, { payload }) {
      const states = state;
      states.list = payload;
    },
  },
};

export default CustomerModal;
