import { $get } from '@/utils/request';

// eslint-disable-next-line no-confusing-arrow
export const roleAll = (o: any) =>
  o.userId
    ? $get(`/eshop/service/auth/user/getUserRoleList?userId=${o.userId}`)
    : $get(`/eshop/service/auth/user/getSubUserRoleList?subUserId=${o.subUserId}`);
