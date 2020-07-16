import RestfulApi from '@/utils/RestfulApi';

export const roleList = new RestfulApi('/eshop/service/auth/role/search');

export const roleAdd = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/role/add', o, { successMsg: '新增成功' });

export const roleAUpdate = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/role/modify', o, { successMsg: '修改成功' });

export const modifyRolePermission = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/role/modifyRolePermission', o, { successMsg: '修改成功' });
