declare module 'slash2';
declare module 'antd-theme-webpack-plugin';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';
declare module 'omit.js';
declare module 'react-copy-to-clipboard';
declare module 'react-fittext';
declare module '@antv/data-set';
declare module 'nzh/cn';
declare module 'webpack-theme-color-replacer';
declare module 'webpack-theme-color-replacer/client';
declare module 'qrcodejs2';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  g_app: {
    _store: {
      dispatch: Function;
      getState: Function;
    };
  };
}

declare let ga: Function;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

// 接口地址
declare let ADMIN_API: string;

// 是否使用权限来控制菜单
declare const IS_USE_PMS: boolean;

interface ISearchPageData {
  // 当前页码
  page?: number;
  // 每页数量
  pageSize?: number;
}

interface RudexAction<T = any> {
  type: T;
}
interface AnyAction extends RudexAction {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

declare type ImmerReducer<S = any, A extends AnyAction = RudexAction> = (
  state: S,
  action: A,
) => void | S;

type TagColorType =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple';

declare module 'memoize-one' {
  type EqualityFn = (newArgs: any[], lastArgs: any[]) => boolean;

  export default function memoizeOne<ResultFn extends (...args: any[]) => any>(
    func: ResultFn,
    isEqual?: EqualityFn,
  ): ResultFn;
}

declare module 'react-redux' {
  /* eslint no-undef: 0 */
  /* eslint react/prefer-stateless-function: 0 */
  export class Provider<A extends AnyAction = RudexAction> extends React.Component<{
    store: any;
  }> {}
}
