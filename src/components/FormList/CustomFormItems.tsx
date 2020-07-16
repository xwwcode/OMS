import React from 'react';
import { Select, Switch } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';

export const StatusSelect = React.forwardRef<SelectProps>((props, ref: any) => (
  <Select {...props} ref={ref} placeholder="选择启用/禁用" allowClear>
    {/* <Select.Option value="">全部</Select.Option> */}
    <Select.Option value="true">启用</Select.Option>
    <Select.Option value="false">禁用</Select.Option>
  </Select>
));

export const StatusSwitch = React.forwardRef<SwitchProps>((props: any, ref: any) => {
  const { ...newProps } = props;
  return (
    <Switch
      {...newProps}
      // disabled={restDisabled}
      checkedChildren="启用"
      unCheckedChildren="禁用"
    />
  );
}) as React.FC<SwitchProps>;

export const StatusAuditSelect = React.forwardRef<SelectProps>((props, ref: any) => (
  <Select {...props} ref={ref} placeholder="选择审核状态">
    <Select.Option value="">全部</Select.Option>
    <Select.Option value="0">未审核</Select.Option>
    <Select.Option value="1">已审核</Select.Option>
    <Select.Option value="2">已作废</Select.Option>
  </Select>
));
