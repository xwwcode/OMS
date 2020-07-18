import React from 'react';
import { Input, Select } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import SkuMessage from './skuMessage';

const { TextArea } = Input;

const style = {
  display: 'flex',
};
const inputStyle = {
  width: '200px',
};

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
    label: '货品名称',
    field: 'name',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.name || '' },
    rules: [{ required: false }],
  },
  {
    label: '货品编码',
    field: 'code',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.code || '' },
    rules: [{ required: true }],
  },
  {
    label: '货品类别',
    field: 'class',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.class || '' },
    rules: [{ required: false }],
  },
  {
    label: '品牌',
    field: 'brand',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.brand || '' },
    rules: [{ required: false }],
  },
  {
    label: '计量单位',
    field: 'unit',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.unit || '' },
    rules: [{ required: false }],
  },
  {
    label: '长度',
    field: 'width',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.width || '' },
    rules: [{ required: false }],
  },
  {
    label: '宽度',
    field: 'breadth',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.breadth || '' },
    rules: [{ required: false }],
  },
  {
    label: '高度',
    field: 'height',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.height || '' },
    rules: [{ required: false }],
  },
  {
    label: '重量',
    field: 'weight',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.weight || '' },
    rules: [{ required: false }],
  },
  {
    label: '是否易碎',
    field: 'isFragile',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: (
      <Select placeholder="请输入" allowClear style={inputStyle}>
        <Select.Option value="1">是</Select.Option>
        <Select.Option value="0">否</Select.Option>
      </Select>
    ),
    options: { initialValue: item.isFragile || '1' },
    rules: [{ required: false }],
  },
  {
    label: '是否危险品',
    field: 'isDangerous',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: (
      <Select placeholder="请输入" allowClear style={inputStyle}>
        <Select.Option value="1">是</Select.Option>
        <Select.Option value="0">否</Select.Option>
      </Select>
    ),
    options: { initialValue: item.isDangerous || '0' },
    rules: [{ required: false }],
  },
  {
    label: '存储方法',
    field: 'cunchu',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: (
      <Select placeholder="请输入" allowClear style={inputStyle}>
        <Select.Option value="1">冷藏</Select.Option>
        <Select.Option value="0">包装</Select.Option>
      </Select>
    ),
    options: { initialValue: item.cunchu || '' },
    rules: [{ required: false }],
  },
  {
    label: '货品保质期限',
    field: 'expirationDate',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: (
      <span style={style}>
        <Input placeholder="请输入" style={inputStyle} />
        &nbsp;&nbsp;天
      </span>
    ),
    options: { initialValue: item.expirationDate || '' },
    rules: [{ required: false }],
  },
  {
    label: '货品临期预警期',
    field: 'expirationDates',
    labelCol: {
      xs: 12,
      sm: 6,
    },
    col: {
      md: 12,
    },
    component: (
      <span style={style}>
        <Input placeholder="请输入" style={inputStyle} />
        &nbsp;&nbsp;天
      </span>
    ),
    options: { initialValue: item.expirationDates || '' },
    rules: [{ required: false }],
  },
  {
    label: '货品SKU信息',
    field: 'skuList',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 24,
      sm: 3,
    },
    wrapperCol: {
      md: 20,
    },
    component: <SkuMessage />,
    options: { initialValue: item.skuList || '' },
    rules: [{ required: false }],
  },
  {
    label: '吊牌价',
    field: 'price',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 3,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.price || '' },
    rules: [{ required: false }],
  },
  {
    label: '货品说明',
    field: 'shuoming',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 3,
    },
    component: <TextArea placeholder="请输入" rows={4} />,
    options: { initialValue: item.shuoming || '' },
    rules: [{ required: false }],
  },
  {
    label: '产地',
    field: 'chandi',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.chandi || '' },
    rules: [{ required: false }],
  },
  {
    label: '产地国',
    field: 'chandiguo',
    col: {
      md: 12,
    },
    labelCol: {
      xs: 12,
      sm: 6,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.chandiguo || '' },
    rules: [{ required: false }],
  },
  {
    label: '生产厂家',
    field: 'changjia',
    col: {
      md: 24,
    },
    labelCol: {
      xs: 12,
      sm: 3,
    },
    component: <Input placeholder="请输入" style={inputStyle} />,
    options: { initialValue: item.changjia || '' },
    rules: [{ required: false }],
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
