import React from 'react';
import { Input, Switch } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

const { TextArea } = Input;

export const searchSchema: IFormSchema[] = [
  {
    label: '供应商全称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '供应商简称',
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
    label: '供应商全称',
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
    label: '供应商简称',
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
    label: '法人代表',
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
    label: '组织机构代码',
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
    label: '固定电话',
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
    label: '手机',
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
    label: '电子邮件',
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
    label: '传真',
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
    label: '网址',
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
    label: '微信',
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
    label: 'QQ号',
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
    label: '支付宝账号',
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
    label: '邮编',
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
    label: '银行账号',
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
    label: '开户行',
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
    label: '营业执照',
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
    label: '税务登记号',
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
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 4,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '公司地址',
    field: 'name',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 4,
    },
    component: <TextArea placeholder="请输入" rows={4} />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
];
