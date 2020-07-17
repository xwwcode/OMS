import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '货品ID',
    field: 'id',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '货品类别',
    field: 'class',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '品牌',
    field: 'cards',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '产地',
    field: 'location',
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
