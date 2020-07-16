import { $post, $get } from '@/utils/request';

export const appList = (o: any) => $get('/eshop/service/auth/application/getAppList', o);
