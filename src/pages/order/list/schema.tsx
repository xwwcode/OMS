import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '订单Id',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '下单时间',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '门店',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货地区',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货人',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货人电话',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品SKU',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '发货仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '订单来源',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '支付方式',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const detailSchema: IFormSchema[] = [
  {
    label: '订单Id',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '销售门店',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '订单来源',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '下单日期',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '支付方式',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '订单成本',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '订单总额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '折扣金额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '调整金额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '配送费用',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '应付金额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '预付金额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '未付金额',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '发货仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货地区',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货地址',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货邮编',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '物流公司',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '买家备注',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '买家留言',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '卖家备注',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const goodsSchema: IFormSchema[] = [];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
];
