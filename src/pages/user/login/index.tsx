import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { appKeys } from '@/common/apis';
import styles from './style.less';
import LoginComponents from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  loginMsg: StateType;
  submitting: boolean;
  accessTocken: any;
}
interface LoginState {
  type: string;
  appKey: string;
  autoLogin: boolean;
}

@connect(({ login, loading }: ConnectState) => ({
  loginMsg: login.loginMsg,
  submitting: loading.effects['login/login'],
  accessTocken: login.isSessionKey,
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  componentWillMount() {
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'login/getSessions',
    //     payload: appKeys(),
    //   });
    // }
  }

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    // this.setState({
    //   autoLogin: e.target.checked,
    // });
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    console.log('======err=======');
    // window.g_app._store.dispatch(routerRedux.push('/user/login'));
    // if (!err) {
    //   const { dispatch, accessTocken, loginMsg } = this.props;
    //   const { appKey, sessionKey } = accessTocken;
    //   dispatch({
    //     type: 'login/login',
    //     payload: { ...values, appKey, sessionKey, loginType: 5 },
    //   });
    // }
  };

  onTabChange = (type: string) => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(
        ['mobile'],
        {},
        async (err: unknown, values: LoginParamsType) => {
          if (err) {
            reject(err);
          } else {
            const { dispatch } = this.props;

            try {
              const success = await ((dispatch({
                type: 'login/getCaptcha',
                payload: values.mobile,
              }) as unknown) as Promise<unknown>);
              resolve(!!success);
            } catch (error) {
              reject(error);
            }
          }
        },
      );
    });

  renderMessage = (content: string) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { loginMsg, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            <UserName
              name="userName"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              // onPressEnter={e => {
              //   e.preventDefault();

              //   if (this.loginForm) {
              //     this.loginForm.validateFields(this.handleSubmit);
              //   }
              // }}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
