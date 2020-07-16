import RestfulApi from '@/utils/RestfulApi';

export const menuApi = new RestfulApi('/eshop/service/auth/menu/getMenuTree');

export const menuAdd = (o: any) => RestfulApi.$post('/eshop/service/auth/menu/addMenu', o);

export const menuUpdate = (o: any) => RestfulApi.$post('/eshop/service/auth/menu/updateMenu', o);

export const menuDelete = (o: any) =>
  RestfulApi.$posts(`/eshop/service/auth/menu/deleteMenu?id=${o}`);
