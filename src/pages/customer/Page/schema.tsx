import React from 'react';
import { Input, Switch, Select, DatePicker } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import { getDefTimeRanges } from '@/utils/utils';

const { TextArea } = Input;

export const searchSchema: IFormSchema[] = [
  {
    label: '客户名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '客户编码',
    field: 'customerCode',
    component: <Input placeholder="请输入" />,
  },
  {
    label: '状态',
    field: 'status',
    component: (
      <Select placeholder="选择启用/禁用" allowClear>
        <Select.Option value="1">启用</Select.Option>
        <Select.Option value="0">禁用</Select.Option>
      </Select>
    ),
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: <DatePicker.RangePicker ranges={getDefTimeRanges()} />,
  },
];

export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '客户编码',
    field: 'customerCode',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.customerCode || '' },
    rules: [{ required: true }],
  },
  {
    label: '名称',
    field: 'name',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '是否启用',
    field: 'status',
    component: <Switch disabled={item.isAdd} checkedChildren="启用" unCheckedChildren="禁用" />,
    options: {
      initialValue: item.status === 1,
      valuePropName: 'checked',
    },
    rules: [{ required: true }],
  },
  {
    label: '备注',
    field: 'remark',
    component: <TextArea rows={4} />,
    options: { initialValue: item.remark || '' },
    rules: [{ required: false }],
  },
];
