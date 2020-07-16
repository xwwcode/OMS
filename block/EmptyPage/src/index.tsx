import React from 'react';
// import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectProps } from '@/models/connect';
import { ConnectPageState } from './model';

import styles from './style.less';

const ACTIONS = {};

interface IProps extends ConnectProps {}

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC<IProps> = ({ dispatch = () => {} }) => {
  return <PageHeaderWrapper className={styles.PAGE_NAME}>新页面</PageHeaderWrapper>;
};

export default connect(({ BLOCK_NAME_CAMEL_CASE, loading }: ConnectPageState) => {
  return {};
})(PAGE_NAME_UPPER_CAMEL_CASE);
