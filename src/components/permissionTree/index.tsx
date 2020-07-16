import React from 'react';
import { Modal, Table, Form, Button, Divider, Select } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';
import { selectfilterOption } from '@/utils/utils';

import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import CustomerList from './customerList';

const ACTIONS = {
  FETCH_ALL: 'permission/perList',
};

interface IProps extends ConnectProps, SelectProps {
  perList: ConnectState['permission']['list'];
  // applicationAll: ConnectState['permission']['appList'];
  isVisible: boolean;
  onSubmit: (pers: any) => void;
  onClose: (v: boolean) => void;
  params: any;
}

const columns = [
  {
    title: '权限名称',
    dataIndex: 'name',
  },
  // {
  //   title: '应用名称',
  //   dataIndex: 'appName',
  // },
  {
    title: '创建人',
    dataIndex: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新人',
    dataIndex: 'updator',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

/**
 * 用于权限form树形结构
 */
class SelectWarehouse extends React.PureComponent<IProps> {
  state = {
    selectParams: [],
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.getPerList();
  }

  getPerList = () => {
    const { dispatch, params, perList, permissinParam } = this.props;
    if (dispatch) {
      const data = {
        customerId: params.customerId,
        appId: params.appId,
        roleId: params.id,
        userId: storage.getItem(STORAGE_KEY.USER).userId,
      };
      dispatch({
        type: ACTIONS.FETCH_ALL,
        payload: data,
      }).then(res => {
        if (res && res.data.length > 0) {
          this.setState(
            {
              selectParams: [],
            },
            () => {
              this.selectFnc(res.data, this.state.selectParams);
            },
          );
        }
        setTimeout(() => {
          const { selectParams } = this.state;
          this.setState({
            selectedRowKeys: selectParams,
          });
        }, 200);
      });
    }
  };

  selectFnc = (data: any, pushItem: any) => {
    data.forEach(item => {
      if (item.isSelect) {
        pushItem.push(item.id);
      }
      if (item.children.length > 0) {
        this.selectFnc(item.children, pushItem);
      }
    });
    this.setState({
      selectParams: pushItem,
    });
  };

  render() {
    const { perList, isVisible, onSubmit, onClose, params, permissinParam } = this.props;
    const onSelectChange = (selectedRowKeys: any) => {
      this.setState({
        selectedRowKeys: Array.from(selectedRowKeys),
      });
    };
    const submit = () => {
      const data: any = {
        permissionIds: this.state.selectedRowKeys,
        roleId: params.id,
        appId: permissinParam.appId,
      };
      onSubmit(data);
    };
    const close = () => {
      onClose(false);
    };
    return (
      <Modal title="分配权限" visible={isVisible} onOk={submit} onCancel={close} width={1000}>
        <Table
          rowKey="id"
          columns={columns}
          rowSelection={{
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: onSelectChange,
          }}
          dataSource={perList}
          pagination={false}
        />
      </Modal>
    );
  }
}

export default connect(({ permission, loading }: ConnectState) => ({
  perList: permission.list,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(SelectWarehouse);
