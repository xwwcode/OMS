import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { UserPos } from '@/models/login';
import PageLoading from '@/components/PageLoading';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean;
  userPos?: UserPos;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, userPos } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = storage.getItem(STORAGE_KEY.TOKEN);
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin) {
      return <Redirect to="/user/login" />;
    }
    return children;
  }
}

export default connect(({ login, loading }: ConnectState) => ({
  userPos: login.userMessage,
  loading: loading.models.login,
}))(SecurityLayout);
