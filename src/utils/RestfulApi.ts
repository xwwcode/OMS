/* eslint-disable no-param-reassign */
import { $get, $post, $posts, $put, $delete, CustomRequestOptionsInit } from './request';
// import { CustomRequestOptionsInit } from './request';

// const { $get, $post, $put, $delete } = request;

interface ExtraApi {
  path: string;
  method?: string;
  options?: CustomRequestOptionsInit;
  successMsg?: string | boolean;
}

const conentType = { 'Content-Type': 'application/json-patch+json' };

export type FetchFuncType = (postData: any) => Promise<any>;

export default class RestfulApi {
  public prifixUrl: string;

  static $get = $get;

  static $post = $post;

  static $put = $put;

  static $delete = $delete;

  static $posts = $posts;

  constructor(prifixUrl: string, others: ExtraApi[] = []) {
    this.prifixUrl = prifixUrl;
    // 额外的接口
    others.forEach(item =>
      this.addApi(item.path, item.method || 'get', item.successMsg, item.options),
    );

    return new Proxy(this, {
      get(target, name: string | number) {
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name);
        }

        const aName = `/${name}`;
        if (Reflect.has(target, aName)) {
          return Reflect.get(target, aName);
        }

        return Reflect.get(target, aName);
      },
    });
  }

  /**
   * 通用
   * @method PUT /api/demo
   */
  isApi = (o: any) => $post(`${this.prifixUrl}`, o);

  /**
   * 获取列表
   * @method GET /api/demo
   */
  index = (o: any) => $get(`${this.prifixUrl}`, o);

  /**
   * 查询数据
   * @method GET /api/demo/query?id=xxx
   */
  query = (o: any) => $get(`${this.prifixUrl}/query`, o);

  /**
   * 查询数据
   * @method GET /api/demo/list?id=xxx
   */
  list = (o: any) => $get(`${this.prifixUrl}/list`, o);

  /**
   * 查询数据
   * @method POST /api/demo/list?id=xxx
   */
  listPost = (o: any) => $post(`${this.prifixUrl}/list`, o);

  /**
   * 获取所有
   * @method GET /api/demo/getAll
   */
  getAll = (o: any) => $get(`${this.prifixUrl}/getAll`, o);

  /**
   * 新增一项
   * @method POST /api/demo
   */
  add = (o: any) => $post(`${this.prifixUrl}`, o, { successMsg: '添加成功' });

  /**
   * 修改一项
   * @method PUT /api/demo
   */
  update = (o: any) => $put(`${this.prifixUrl}`, o, { successMsg: '修改成功' });

  /**
   * 删除一项
   * @method DELETE /api/demo
   */
  destroy = (o: any) =>
    $delete(`${this.prifixUrl}`, o, {
      successMsg: '删除成功',
      headers: conentType,
    });

  deleteById = (id: number, o: any) =>
    $delete(`${this.prifixUrl}/?id=${id}`, o, { successMsg: '删除成功' });

  /**
     手动调度
    * */
  postBody = (o: any) =>
    $post(`${this.prifixUrl}`, o, {
      successMsg: '操作成功',
      headers: conentType,
    });

  /**
   * 启用
   * @method POST /api/demo/enable
   */
  enable = (o: any) =>
    $post(`${this.prifixUrl}/enable`, o, {
      successMsg: '启用成功',
      headers: conentType,
    });

  /**
   * 禁用
   * @method POST /api/demo/disable
   */
  disable = (o: any) =>
    $post(`${this.prifixUrl}/disable`, o, {
      successMsg: '禁用成功',
      headers: conentType,
    });

  /**
   * 获取某一项的详细数据
   * @method GET /api/demo/{id}
   */
  byId = (id: number | string, o: any) => $get(`${this.prifixUrl}/${id}`, o);

  getArea = (id: number | string, o: any) => $get(`${this.prifixUrl}${id}`, o);

  /**
   * 获取树形数据
   * @method GET /api/demo/tree
   */
  tree = (o: any) => $get(`${this.prifixUrl}/tree`, o);

  addApi = (
    path: ExtraApi['path'],
    method: ExtraApi['method'] = 'get',
    successMsg?: ExtraApi['successMsg'],
    options?: ExtraApi['options'],
  ) => {
    if (!path) return this;
    if (['get', 'post', 'put', 'delete'].indexOf(method) === -1) {
      method = 'get';
    }
    const func = RestfulApi[`$${method}`] || $get;
    this[path] = (o: any) =>
      func(this.prifixUrl + path, o, {
        successMsg,
        ...options,
      });
    return this;
  };

  getApi(path: string): Promise<any> {
    return this[path];
  }
}
