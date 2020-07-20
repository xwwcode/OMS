import React from 'react';
import { DatePicker } from 'antd';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

interface IProps extends ConnectProps {
  onChange: (val: any) => void;
}
/**
 * 选择时间框
 */
class DatePicke extends React.PureComponent<IProps> {
  componentDidMount() {
    console.log(this.props, 'props');
  }

  onChange = (val: any, dataString: string) => {
    const { onChange } = this.props;
    onChange(dataString);
  };

  render() {
    return (
      <DatePicker
        showTime
        placeholder="请选择时间"
        onChange={this.onChange}
        format="YYYY-MM-DD HH:mm:ss"
      />
    );
  }
}

export default DatePicke;
