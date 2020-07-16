import { $posts, $get } from '@/utils/request';

// eslint-disable-next-line no-confusing-arrow
export const premissAll = (o: any) =>
  o.subRoleId
    ? $get(
        `/eshop/service/auth/role/getSubRolePermissionList?appId=${o.appId}&customerId=${o.customerId}&subRoleId=${o.roleId}&userId=${o.userId}`,
        '',
        { successMsg: '操作成功' },
      )
    : $get(
        `/eshop/service/auth/role/getRolePermissionList?appId=${o.appId}&customerId=${o.customerId}&roleId=${o.roleId}&userId=${o.userId}`,
        '',
        { successMsg: '操作成功' },
      );

export const applicationAll = (o: any) =>
  $get(`/eshop/service/auth/application/getAppList?customerId=${o}`);
