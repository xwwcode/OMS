import React from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';

const ACTIONS = {
  FETCH_ALL: 'customer/customerList',
};

interface IProps extends ConnectProps, SelectProps {
  customerList: ConnectState['customer']['list'];
  isDesabled?: boolean;
}

/**
 * 用于formItem的下拉列表
 */
class SelectWarehouse extends React.PureComponent<IProps> {
  render() {
    const { customerList, isDesabled, dispatch, ...restProps } = this.props;
    return (
      <Select
        {...restProps}
        placeholder="请选择客户"
        showSearch
        filterOption={selectfilterOption}
        style={{ minWidth: 160 }}
        disabled={isDesabled}
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
