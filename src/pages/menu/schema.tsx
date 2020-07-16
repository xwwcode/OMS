import React from 'react';
import { Input, Button } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import ApplicationTree from '@/components/Application/index';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

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
      rules: [{ required: true }],
      options: {
        initialValue: defaultAppVal,
      },
    },
  ];
  return searchForm;
};
