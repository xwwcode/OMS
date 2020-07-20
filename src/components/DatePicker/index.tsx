import React from 'react';
import { DatePicker } from 'antd';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

interface IProps extends ConnectProps {}
/**
 * 用于应用列表的下拉列表
 */
class DatePicke extends React.PureComponent<IProps> {
  onChange = (val: any) => {
    console.log(val, '000000000');
  };

  onOk = () => {
    console.log('onOK');
  };

  render() {
    return <DatePicker showTime placeholder="请选择时间" onChange={onChange} onOk={onOk} />;
  }
}

export default DatePicke;
