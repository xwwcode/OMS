import React from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const ACTIONS = {
  FETCH_ALL: 'customer/customerList',
};

interface IProps extends ConnectProps, SelectProps {
  customerList: ConnectState['customer']['list'];
  onParams: (roles: any) => void;
  changeVal: any;
}

/**
 * 用于formItem的下拉列表
 */
class SelectWarehouse extends React.PureComponent<IProps> {
  state = {
    isVal: null,
  };

  onChange = (res: any) => {
    const { onParams } = this.props;
    this.setState(
      {
        isVal: res,
      },
      () => {
        onParams(this.state.isVal);
      },
    );
  };

  render() {
    const { customerList, changeVal } = this.props;

    return (
      <Select
        placeholder="请选择客户"
        showSearch
        onChange={this.onChange}
        value={storage.getItem(STORAGE_KEY.USER).customerId || changeVal}
        filterOption={selectfilterOption}
        style={{ minWidth: 160 }}
        disabled={
          storage.getItem(STORAGE_KEY.USER).customerId &&
          storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
        }
      >
        {Array.isArray(customerList) &&
          customerList.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
    );
  }
}

export default connect(({ customer, loading }: ConnectState) => ({
  customerList: customer.list,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(SelectWarehouse);
