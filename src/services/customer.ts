import request from '@/utils/request';

export async function queryList(): Promise<any> {
  return request('/eshop/service/auth/customer/getCustomerList');
}
