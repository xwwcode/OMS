export const AREA_DATA = {
  CHINA: '中国',
  CHINA_ID: '00000000-0000-0000-1000-000000000000',
};

// 支付枚举
export enum PAY_MENT_ENUM {
  '银行卡' = 1,
  '支付宝' = 2,
  '微信' = 3,
  '现金' = 4,
}
// 支付列表
export const PAY_MENT_LIST: any[] = [
  {
    label: PAY_MENT_ENUM[1],
    id: 1,
  },
  {
    label: PAY_MENT_ENUM[2],
    id: 2,
  },
  {
    label: PAY_MENT_ENUM[3],
    id: 3,
  },
  {
    label: PAY_MENT_ENUM[4],
    id: 4,
  },
];

// 退货原因
export enum REASON_BACK {
  '次品退货' = 1,
  '滞销' = 2,
  '其它' = 3,
}
// 支付列表
export const REASON_BACK_LIST: any[] = [
  {
    label: REASON_BACK[1],
    id: 1,
  },
  {
    label: REASON_BACK[2],
    id: 2,
  },
  {
    label: REASON_BACK[3],
    id: 3,
  },
];

// 账单明细类型
export enum BILL_TYPE_ENUM {
  '采购' = 1,
  '退货' = 2,
  '付款' = 3,
}

export const BILL_TYPE_LIST: any = [
  {
    label: '全部',
    id: '',
  },
  {
    label: BILL_TYPE_ENUM[1],
    id: 1,
  },
  {
    label: BILL_TYPE_ENUM[2],
    id: 2,
  },
  {
    label: BILL_TYPE_ENUM[3],
    id: 3,
  },
];

// 平摊费用类型
export enum COST_TYPE_ENUM {
  '运费' = 1,
  '关税' = 2,
  '报关费' = 3,
  '其他' = 99,
}

export const COST_TYPE_LIST: any = [
  {
    label: BILL_TYPE_ENUM[1],
    id: 1,
  },
  {
    label: BILL_TYPE_ENUM[2],
    id: 2,
  },
  {
    label: BILL_TYPE_ENUM[3],
    id: 3,
  },
  {
    label: BILL_TYPE_ENUM[3],
    id: 99,
  },
];
/**
 * 列表项操作
 * 0 = 未审核
 * 1 = 待二审
 * 2 = 待终审
 * 3 = 未到货
 * 4 = 部分到货
 * 5 = 全部到货
 * 6 = 已取消
 */
export enum PURCHASE_ORDER_TYPE {
  WAIT_AUDIT$1 = 0,
  WAIT_AUDIT$2 = 1,
  WAIT_AUDIT$3 = 2,
  // 未到货
  TRANSPORING = 3,
  DELIVERY_PRAT = 4,
  DELIVERY_ALL = 5,
  CANCEL = 6,
}

/**
 * 状态
 * 0 = 未审核; 1 = 待二审; 2 = 待终审; 3 = 待配货; 4 = 已配货; 5 = 已取消; 6 = 部分配货
 */
export enum PURCHASE_RETURN_ORDER_TYPE {
  WAIT_AUDIT$1 = 0,
  WAIT_AUDIT$2 = 1,
  WAIT_AUDIT$3 = 2,
  // 未到货
  TRANSPORING = 3,
  TRANSPOR_FINISH = 4,
  DELIVERY_PRAT = 6,
  CANCEL = 5,
}

// 自定义字段类型
export enum CUSTOM_FIELD_TYPE {
  INPUT = 1,
  TEXTAREA = 2,
  SELECT = 3,
  CHECKBOX = 4,
  RIAIO = 5,
  DATEPICKER = 6,
  NUMBER = 7,
}
/**
 * 系统参数类型
 *
 * */
export enum SYSTEM_TYPE {
  '文本' = 1,
  '列表' = 2,
}
export const SYSTEM_TYPE_LIST: any = [
  {
    label: SYSTEM_TYPE[1],
    id: 1,
  },
  {
    label: SYSTEM_TYPE[2],
    id: 2,
  },
];

/*
调度任务类型
*/
export enum SCHEDULE_TASK_TYPE {
  '同步商品到电商' = 1,
  '推送删除商品到电商' = 2,
  '同步商品到WMS' = 3,
  '推送删除商品到WMS' = 4,
  '推送出库单到WMS' = 5,
  '取消配货通知单' = 6,
  '推送配货通知单到WMS' = 7,
  '推送收货通知单到WMS' = 8,
  '全量同步库存到电商' = 9,
  '增量同步库存到电商' = 10,
}
export const SCHEDULE_TASK_TYPE_LIST = [
  {
    label: SCHEDULE_TASK_TYPE[1],
    id: 1,
  },
  {
    label: SCHEDULE_TASK_TYPE[2],
    id: 2,
  },
  {
    label: SCHEDULE_TASK_TYPE[3],
    id: 3,
  },
  {
    label: SCHEDULE_TASK_TYPE[4],
    id: 4,
  },
  {
    label: SCHEDULE_TASK_TYPE[5],
    id: 5,
  },
  {
    label: SCHEDULE_TASK_TYPE[6],
    id: 6,
  },
  {
    label: SCHEDULE_TASK_TYPE[7],
    id: 7,
  },
  {
    label: SCHEDULE_TASK_TYPE[8],
    id: 8,
  },
  {
    label: SCHEDULE_TASK_TYPE[9],
    id: 9,
  },
  {
    label: SCHEDULE_TASK_TYPE[10],
    id: 10,
  },
];

/*
调度任务状态
*/
export enum SCHEDULE_TASK_STATUS {
  '等待中' = 1,
  '调度中' = 2,
  '成功' = 3,
  '失败' = 4,
}
export const SCHEDULE_TASK_STATUS_LIST = [
  {
    label: SCHEDULE_TASK_STATUS[1],
    id: 1,
  },
  {
    label: SCHEDULE_TASK_STATUS[2],
    id: 2,
  },
  {
    label: SCHEDULE_TASK_STATUS[3],
    id: 3,
  },
  {
    label: SCHEDULE_TASK_STATUS[4],
    id: 4,
  },
];
