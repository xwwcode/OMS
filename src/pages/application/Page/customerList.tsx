import React from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';

const ACTIONS = {
  FETCH_ALL: 'customerAndPage/fetchList',
};

interface IProps extends ConnectProps, SelectProps {
  customerAll: ConnectState['customerAndPage']['fetchList'];
  hasAll?: boolean;
  enabledAll?: boolean;
}

/**
 * 用于formItem的下拉列表
 */
class SelectCustomer extends React.PureComponent<IProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({ type: ACTIONS.FETCH_ALL });
    }
  }

  render() {
    const { customerAll, dispatch, hasAll, enabledAll, ...restProps } = this.props;

    return (
      <Select {...restProps} placeholder="请选择客户" showSearch filterOption={selectfilterOption}>
        {hasAll && <Select.Option value="">全部</Select.Option>}
        {Array.isArray(customerAll) &&
          customerAll.map(item => (
            <Select.Option
              key={item.value}
              value={item.value}
              disabled={enabledAll ? false : item.enabled === false}
            >
              {item.text}
            </Select.Option>
          ))}
      </Select>
    );
  }
}

export default connect(({ customerAndPage, loading }: ConnectState) => ({
  customerAll: customerAndPage.list,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(SelectCustomer);
