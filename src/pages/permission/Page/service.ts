import RestfulApi from '@/utils/RestfulApi';

export const permissionAndPageApi = new RestfulApi('/eshop/service/auth/permission/search');

export const permissionAdd = (o: any) => RestfulApi.$post('/eshop/service/auth/permission/add', o);

export const permissionEdit = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/permission/modify', o, { successMsg: '操作成功' });

export const permissionRemove = (o: any) =>
  RestfulApi.$posts(`/eshop/service/auth/permission/remove?id=${o}`, { successMsg: '操作成功' });
