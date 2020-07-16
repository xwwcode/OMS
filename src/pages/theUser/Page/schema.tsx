import React from 'react';
import { Input, Select, Switch, Radio } from 'antd';
import { IFormSchema } from 'utopa-antd-pro/dist/components/FormList';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import validator from '@/utils/validator';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

export const searchSchema = (): IFormSchema[] => {
  const isDesable = !!(
    storage.getItem(STORAGE_KEY.USER) && storage.getItem(STORAGE_KEY.USER).isSuperAdmin === 0
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
      label: '用户名',
      field: 'userName',
      component: <Input placeholder="请输入" />,
    },
    {
      label: '姓名',
      field: 'fullName',
      component: <Input placeholder="请输入" />,
    },
    {
      label: '手机号',
      field: 'mobile',
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
    storage.getItem(STORAGE_KEY.USER) && storage.getItem(STORAGE_KEY.USER).isSuperAdmin === 0
  );
  let password = '';
  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    password = value;
    callback();
  };
  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== password) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };
  const form = [
    {
      label: '用户名',
      field: 'userName',
      component: <Input placeholder="请输入" disabled={!!item.userName} />,
      options: { initialValue: item.userName || '' },
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
          : item.customerId || null,
      },
      rules: [{ required: true }],
    },
    {
      label: '用户渠道',
      field: 'regOrigin',
      component: (
        <Radio.Group>
          <Radio value={1}>APP</Radio>
          <Radio value={2}>H5</Radio>
        </Radio.Group>
      ),
      options: {
        initialValue: item.regOrigin || 1,
      },
      rules: [{ required: true }],
    },
    {
      label: '是否启用',
      field: 'status',
      component: <Switch disabled={!!item.isAdd} checkedChildren="启用" unCheckedChildren="禁用" />,
      options: {
        initialValue: item.status === 1,
        valuePropName: 'checked',
      },
      rules: [{ required: true }],
    },
    {
      label: '姓名',
      field: 'fullName',
      component: <Input placeholder="请输入" disabled={!!item.fullName} />,
      options: { initialValue: item.fullName || '' },
      rules: [{ required: true }],
    },
    {
      label: '手机号',
      field: 'mobile',
      component: <Input placeholder="请输入" />,
      options: { initialValue: item.mobile || '' },
      rules: [{ required: true }, validator.isPhone],
    },
    item.isAdd && {
      label: '密码',
      field: 'password',
      component: <Input placeholder="请输入" disabled={!!item.password} />,
      options: { initialValue: item.password || '' },
      rules: [{ required: true }, { validator: validateToNextPassword }],
    },
    item.isAdd && {
      label: '确认密码',
      field: 'confirm',
      component: <Input placeholder="请输入" disabled={!!item.confirm} />,
      options: { initialValue: item.confirm || '' },
      rules: [{ required: true }, { validator: compareToFirstPassword }],
    },
    {
      label: '邮箱',
      field: 'email',
      component: <Input placeholder="请输入" />,
      options: { initialValue: item.email || '' },
      rules: [{ required: false }, { type: 'email' }],
    },
  ];
  return form;
};

export const handOverSchema = (item: any = {}): IFormSchema[] => [
  {
    label: '交接人',
    field: 'newUserId',
    component: (
      <Select showSearch style={{ width: 200 }} placeholder="请选择" optionFilterProp="children">
        {Array.isArray(item) &&
          item.map(arr => (
            <Select.Option key={arr.id} value={arr.id}>
              {arr.fullName}
            </Select.Option>
          ))}
      </Select>
    ),
    rules: [{ required: true }],
  },
];
