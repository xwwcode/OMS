import RestfulApi from '@/utils/RestfulApi';

export const applicationList = new RestfulApi('/eshop/service/auth/application/search');

export const applicationAdd = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/application/add', o, { successMsg: '操作成功' });

export const applicationUpdate = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/application/modify', o, { successMsg: '操作成功' });
