import React from 'react';
import { Input, Switch } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

export const searchSchema: IFormSchema[] = [
  {
    label: '仓库名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '可用状态',
    field: 'name',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 4,
    },
    component: <Switch disabled={item.isAdd} checkedChildren="启用" unCheckedChildren="禁用" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '仓库名称',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '仓库处理能力',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '联系人',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '仓库类型',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '联系电话',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '移动电话',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '所在国家',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '所在省份',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '所在城市',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '地址',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '服务提供商',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 8,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
];
