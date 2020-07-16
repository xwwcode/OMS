import RestfulApi from '@/utils/RestfulApi';

export const customerList = (o: any) => RestfulApi.$post('/eshop/service/auth/customer/search', o);

export const customerAdd = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/customer/add', o, { successMsg: '操作成功' });

export const customerUpdate = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/customer/updateCustomer', o, { successMsg: '操作成功' });

export const deleteCustomer = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/customer/search', o, { successMsg: '操作成功' });
