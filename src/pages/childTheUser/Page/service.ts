import RestfulApi from '@/utils/RestfulApi';

// export function userDropDownList(): Promise<any> {
//   return request('/service/auth/user/dropdownList');
// }

export const userList = new RestfulApi('/eshop/service/auth/user/search');

export const userAdd = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/user/add', o, { successMsg: '操作成功' });

export const userUpdate = (o: any) =>
  RestfulApi.$post('/eshop/service/auth/user/modify', o, { successMsg: '修改成功' });

// 重置密码
export const resetPassWords = (o: any) =>
  RestfulApi.$posts(`/eshop/service/auth/user/resetPassWord?userId=${o}`, {
    successMsg: '重置成功',
  });

// 账号交接
export const handOvers = (o: any) =>
  RestfulApi.$posts(
    `/eshop/service/auth/user/handover?newUserId=${o.newUserId}&oldUserId=${o.oldUserId}`,
    { successMsg: '交接成功' },
  );

// 分配角色
export const saveAllRole = (o: any) => {
  RestfulApi.$post('/eshop/service/auth/user/allotRole', o, { successMsg: '分配成功' });
};

// 用户信息下拉列表
export const userDropDownList = (o: any) =>
  RestfulApi.$get(`/eshop/service/auth/user/getMainUserList?customerId=${o}`);
