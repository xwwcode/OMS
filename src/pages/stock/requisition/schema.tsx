import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '货品SKU条码',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品SKU编码',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品SKU名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const detailSchema: IFormSchema[] = [
  {
    label: '货品SKU条码',
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
