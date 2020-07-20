import React from 'react';
import { Input } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

const { TextArea } = Input;

export const searchSchema: IFormSchema[] = [
  {
    label: '品牌名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '品牌全称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '品牌简称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: false }],
  },
  {
    label: '备注',
    field: 'note',
    component: <TextArea placeholder="请输入" rows={4} />,
    options: { initialValue: item.note || '' },
    rules: [{ required: false }],
  },
];
