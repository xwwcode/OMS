import { REG_PHONE, REG_MOBILE_PHONE } from '@/common/regexp';

/**
 * @see https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99
 * @see https://github.com/yiminghe/async-validator
 */
export default {
  isPhone: { type: 'string', pattern: REG_PHONE, message: '请输入正确的电话号码', max: 13 },
  isMobilePhone: { type: 'string', pattern: REG_MOBILE_PHONE, message: '请输入正确的手机号码' },
  isPassword: { min: 6, massage: '密码长度不低于6位' },
};
