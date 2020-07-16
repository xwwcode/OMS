import request from '@/utils/request';
import RestfulApi from '@/utils/RestfulApi';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export interface appKeyType {
  appKey: string;
}

export interface sessionKeyType {
  sessionKey: string;
}

export async function fakeAccountLogin(
  appKey: appKeyType,
  sessionKey: sessionKeyType,
  params: LoginParamsType,
) {
  return request(`/eshop/core/account/login/doLogin?appKey=${appKey}&sessionKey=${sessionKey}`, {
    method: 'POST',
    data: params,
  });
}

export async function getUserMessage(o: any) {
  // 获取用户信息
  return request(`/eshop/core/account/userdata/getUserData?userId=${o}`, {
    method: 'GET',
  });
}

export async function getUserMenu(o: any) {
  // 获取用户菜单
  return request(`/eshop/core/account/userdata/getUserMenu?userId=${o}`, {
    method: 'GET',
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getSession(o: any) {
  return request(`/eshop/core/account/session/genSession?appKey=${o}`, {
    method: 'POST',
  });
}

export const modifyPassword = (o: any) =>
  RestfulApi.$posts(
    `/eshop/service/auth/user/modifyPassword?newPassword=${o.newPassword}&oldPassword=${o.oldPassword}&userId=${o.userId}`,
    { successMsg: '操作成功' },
  );
