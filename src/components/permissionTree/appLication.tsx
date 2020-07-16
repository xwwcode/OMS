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
};

interface IProps extends ConnectProps, SelectProps {
  appLicationAll: ConnectState['permission']['appList'];
  onSelect?: (value: any) => void;
}

/**
 * 用于应用列表的下拉列表
 */
class SelectWarehouse extends React.PureComponent<IProps> {
  onChange = (value: any) => {
    this.props.onSelect(value);
  };

  render() {
    const { appLicationAll, ...restProps } = this.props;
    return (
      <Select
        {...restProps}
        showSearch
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
