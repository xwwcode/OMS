import React from 'react';
import { Input, Radio, Switch } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';

const { TextArea } = Input;

export const searchSchema: IFormSchema[] = [
  {
    label: '门店名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '门店网址',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '门店名称',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '门店简称',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '门店类型',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '店铺地址',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '所在平台',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '授权类型',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: (
      <Radio.Group>
        <Radio value={1}>自有服务</Radio>
        <Radio value={2}>外部服务</Radio>
      </Radio.Group>
    ),
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '外部服务名称',
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
    label: '电商平台授权状态',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 10,
    },
    component: <Switch checkedChildren="授权" unCheckedChildren="取消授权" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: 'AppKey',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: 'SecretKey',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: 'Token',
    field: 'name',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 6,
      sm: 3,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '店长',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
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
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '联系手机',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
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
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '开户银行',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '银行账户',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '备注',
    field: 'note',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 3,
    },
    component: <TextArea placeholder="请输入" rows={4} />,
    options: { initialValue: item.note || '' },
    rules: [{ required: false }],
  },
];
