import { Avatar, Icon, Menu, Spin, Input } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import { visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps, ConnectState } from '@/models/connect';
import { UserPos } from '@/models/login';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  userPos?: UserPos;
  menu?: boolean;
}

const changePwdSchema = [
  {
    label: '旧密码',
    field: 'oldPassword',
    component: <Input placeholder="请输入旧密码" type="password" />,
    rules: [{ required: true }],
  },
  {
    label: '新密码',
    field: 'newPassword',
    component: <Input placeholder="请输入新密码" type="password" />,
    rules: [{ required: true }],
  },
];

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;
    const { dispatch } = this.props;
    if (dispatch && key === 'editPass') {
      visibleFormModal(changePwdSchema, {
        title: '修改密码',
        okText: '确认',
        onOk: payload =>
          dispatch({
            type: 'login/modifyPassword',
            payload: { ...payload, userId: storage.getItem(STORAGE_KEY.TOKEN).userId },
          }),
      });
    }

    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
    }
  };

  render(): React.ReactNode {
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="editPass">
          <Icon type="redo" />
          修改密码
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).userName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {/* <Avatar size="small" className={styles.avatar} alt="avatar" /> */}
          <span className={styles.name}>{storage.getItem(STORAGE_KEY.TOKEN).userName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ login }: ConnectState) => ({
  userPos: login.userMessage,
}))(AvatarDropdown);
