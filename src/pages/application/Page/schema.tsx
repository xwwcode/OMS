import React from 'react';
import { Input, Switch, Select } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const { TextArea } = Input;

export const searchSchema = (): IFormSchema[] => {
  const isDesable = !!(
    storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
  );
  const searchForm = [
    {
      label: '所属客户',
      field: 'customerId',
      component: <CustomerList isDesabled={isDesable} />,
      options: {
        initialValue: storage.getItem(STORAGE_KEY.USER)
          ? storage.getItem(STORAGE_KEY.USER).customerId
          : null,
      },
    },
    {
      label: 'appKey',
      field: 'appKey',
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
  ];
  return searchForm;
};

export const editSchema = (item: any = {}): IFormSchema[] => {
  const isDesable = !!(
    storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
  );
  const form = [
    {
      label: '所属客户',
      field: 'customerId',
      /* eslint no-underscore-dangle: 0 */
      component: <CustomerList store={window.g_app._store} isDesabled={isDesable} />,
      options: {
        initialValue: storage.getItem(STORAGE_KEY.USER).customerId
          ? storage.getItem(STORAGE_KEY.USER).customerId
          : item.customerId || null,
      },
      rules: [{ required: true }],
    },
    {
      label: '名称',
      field: 'appName',
      component: <Input placeholder="请输入" />,
      options: { initialValue: item.appName || '' },
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
  return form;
};
