import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '退供出库单ID',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '退供仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '供应商',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '退供单日期',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '状态',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const detailSchema: IFormSchema[] = [
  {
    label: '退供出库单ID',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '退供仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '供应商',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货地址',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const goodsSchema: IFormSchema[] = [
  {
    label: '货品名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品编码',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
];
