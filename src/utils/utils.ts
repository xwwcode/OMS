import { parse } from 'querystring';
import moment, { Moment } from 'moment';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends { path: string }>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};

// 获取时间区间，可以直接给DatePicker.RangePicker使用
export const getDefTimeRanges = ((m: Moment) => (
  currentMoment: Moment = m,
): {
  [range: string]: [moment.Moment, moment.Moment];
} => ({
  今天: [currentMoment.clone(), currentMoment.clone()],
  近3天: [currentMoment.clone().subtract(2, 'days'), currentMoment.clone()],
  近7天: [currentMoment.clone().subtract(6, 'days'), currentMoment.clone()],
  近30天: [currentMoment.clone().subtract(29, 'days'), currentMoment.clone()],
  这个星期: [currentMoment.clone().startOf('week'), currentMoment.clone().endOf('week')],
  这个月: [currentMoment.clone().startOf('month'), currentMoment.clone().endOf('month')],
}))(moment());

// --------------时间end------------------

/**
 * 放到Select组件里面可以变成模糊搜索的Select
 */
export const selectfilterOption = (input: string, option: any) =>
  (option &&
    option.props &&
    option.props.children &&
    typeof option.props.children === 'string' &&
    option.props.children.indexOf(input) > -1) ||
  false;
