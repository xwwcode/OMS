import React from 'react';
import { Input } from 'antd';
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
          : null,
      },
    },
    {
      label: '应用名称',
      field: 'appId',
      component: <ApplicationTree />,
      options: {
        initialValue: defaultAppVal,
      },
      rules: [{ required: true }],
    },
  ];
  return searchForm;
};
export const editSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '权限名称',
    field: 'name',
    component: <Input />,
    options: { initialValue: item.name || '' },
    rules: [{ required: true }],
  },
  {
    label: '权限key',
    field: 'permissionKey',
    component: <Input />,
    options: { initialValue: item.permissionKey || '' },
    rules: [{ required: true }],
  },
  {
    label: '备注',
    field: 'remark',
    component: <TextArea rows={4} />,
    options: { initialValue: item.remark || '' },
  },
];

export const addSchema = (item: any = {}): IFormSchema[] => {
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
      label: '所属应用',
      field: 'appId',
      component: <AppSelect store={window.g_app._store} disabled={!!item.appId} />,
      options: { initialValue: item.appId || undefined },
      rules: [
        {
          required: true,
          message: '请选择所属应用',
        },
      ],
    },
    {
      label: '权限名称',
      field: 'name',
      component: <Input />,
      options: { initialValue: '' },
      rules: [{ required: true }],
    },
    {
      label: '权限key',
      field: 'permissionKey',
      component: <Input />,
      options: { initialValue: '' },
      rules: [{ required: true }],
    },
    {
      label: '备注',
      field: 'remark',
      component: <TextArea rows={4} />,
      options: { initialValue: '' },
      rules: [{ required: false }],
    },
  ];
  return form;
};
