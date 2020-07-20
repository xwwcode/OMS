import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '到货通知单ID',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '供应商',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '收货仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '实际到货日期',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '差异情况',
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
    label: '到货通知单ID',
    field: 'name',
    component: <Input placeholder="请输入" disabled />,
  },
  {
    label: '收货仓库',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '供应商',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '预计到货日期',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '备注',
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
