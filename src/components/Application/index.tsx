import React from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const ACTIONS = {
  FETCH_ALL: 'permission/appLicationList',
  FETCH_DEFAULTVAL: 'permission/setDefaultVal',
};
interface IProps extends ConnectProps, SelectProps {
  appLicationAll: ConnectState['permission']['appList'];
}
/**
 * 用于应用列表的下拉列表
 */
class SelectWarehouse extends React.PureComponent<IProps> {
  onChanges = (val: any) => {
    const { onChange, dispatch } = this.props;
    onChange(val);
    if (dispatch) {
      dispatch({ type: ACTIONS.FETCH_DEFAULTVAL, payload: val });
    }
  };

  render() {
    const { appLicationAll, ...restProps } = this.props;
    return (
      <Select
        {...restProps}
        onChange={this.onChanges}
        filterOption={selectfilterOption}
        style={{ minWidth: 160 }}
        placeholder="请选择所属应用"
      >
        {Array.isArray(appLicationAll) &&
          appLicationAll.map(item => (
            <Select.Option key={item.id} value={item.id}>
              {item.appName}
            </Select.Option>
          ))}
      </Select>
    );
  }
}

export default connect(({ permission, loading }: ConnectState) => ({
  appLicationAll: permission.appList,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(SelectWarehouse);
