import React from 'react';
import { Input, Switch, Select } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import ApplicationTree from '@/components/Application/index';
import AppSelect from '@/components/permissionTree/appLication';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const { TextArea } = Input;

export const searchSchema = (defaultAppVal: any): IFormSchema[] => {
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
          : undefined,
      },
    },
    {
      label: '应用名称',
      field: 'appId',
      component: <ApplicationTree />,
      rules: [{ required: true }],
      options: {
        initialValue: defaultAppVal,
      },
    },
    {
      label: '角色名称',
      field: 'roleName',
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

export const editSchema = (item: any = {}, defaultAppVal?: any): IFormSchema[] => {
  const isDesable = !!(
    storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
  );
  const form = [
    {
      label: '角色名称',
      field: 'roleName',
      component: <Input placeholder="请输入" />,
      options: { initialValue: item.roleName || '' },
      rules: [{ required: true }],
    },
    {
      label: '所属客户',
      field: 'customerId',
      /* eslint no-underscore-dangle: 0 */
      component: (
        <CustomerList store={window.g_app._store} isDesabled={isDesable || !!item.customerId} />
      ),
      options: {
        initialValue: storage.getItem(STORAGE_KEY.USER).customerId
          ? storage.getItem(STORAGE_KEY.USER).customerId
          : item.customerId || undefined,
      },
      rules: [{ required: true }],
    },
    {
      label: '所属应用',
      field: 'appId',
      /* eslint no-underscore-dangle: 0 */
      component: <AppSelect store={window.g_app._store} disabled={!!item.appId} />,
      options: {
        initialValue: item.appId || undefined,
      },
      rules: [
        {
          required: true,
          message: '请选择所属应用',
        },
      ],
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

export const childSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '角色名称',
    field: 'roleName',
    component: <Input placeholder="请输入" />,
    options: { initialValue: item.roleName || '' },
    rules: [{ required: true }],
  },
  {
    label: '父角色',
    field: 'parentRoleName',
    component: <Input placeholder="请输入" disabled />,
    options: { initialValue: item.parentRoleName || '' },
    rules: [{ required: true }],
  },
  {
    label: '所属客户',
    field: 'customerId',
    /* eslint no-underscore-dangle: 0 */
    component: <CustomerList store={window.g_app._store} disabled />,
    options: { initialValue: item.customerId || null },
    rules: [{ required: true }],
  },
  {
    label: '备注',
    field: 'Childremark',
    component: <TextArea rows={4} />,
    options: { initialValue: item.Childremark || '' },
    rules: [{ required: false }],
  },
];
