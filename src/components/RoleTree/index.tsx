import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { connect } from 'dva';
import { SelectProps } from 'antd/lib/select';
import { ConnectProps, ConnectState } from '@/models/connect';

const ACTIONS = {
  FETCH_ALL: 'role/roleList',
  IS_PARAMS: 'role/fetchParams',
};

interface IProps extends ConnectProps, SelectProps {
  roleItem: ConnectState['role']['list'];
  isVisible: boolean;
  isParams: any;
  onSubmit: (roles: any) => void;
  onClose: (v: boolean) => void;
}

const columns = [
  {
    title: '应用名称',
    dataIndex: 'appName',
  },
  // {
  //   title: '应用名称',
  //   dataIndex: 'appName',
  // },
  // {
  //   title: '创建人',
  //   dataIndex: 'creator',
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  // },
  // {
  //   title: '更新人',
  //   dataIndex: 'updator',
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updateTime',
  // },
];

/**
 * 用于form树形结构
 */

interface Istate {
  selectedRowKeys: any[];
}

class roleTree extends React.PureComponent<IProps, Istate> {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    const { dispatch, isParams } = this.props;
    if (dispatch) {
      dispatch({
        type: ACTIONS.FETCH_ALL,
        payload: isParams,
      }).then(res => {
        if (res.data && res.data.length > 0) {
          const isSelectAry: Array = [];
          res.data.forEach(item => {
            if (item.roleList && item.roleList.length > 0) {
              item.roleList.forEach(ite => {
                if (ite.isSelect) {
                  isSelectAry.push(ite.id);
                }
              });
            }
          });
          this.setState({
            selectedRowKeys: isSelectAry,
          });
        }
      });
    }
  }

  expandedRowRender = records => {
    const childColumns = [
      { title: '角色名称', dataIndex: 'roleName' },
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

    return (
      <Table
        rowKey="id"
        columns={childColumns}
        dataSource={records.roleList}
        pagination={false}
        rowSelection={{
          selectedRowKeys: this.state.selectedRowKeys,
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(selectedRowKeys, 'selectedRowKeys', selectedRows, 'selectedRows');
            this.setState(
              {
                selectedRowKeys: Array.from(selectedRowKeys),
              },
              () => {
                console.log(this.state.selectedRowKeys, '---this.state.selectedRowKeys---');
              },
            );
          },
        }}
      />
    );
  };

  render() {
    const { roleItem, isVisible, onSubmit, onClose } = this.props;

    const onOk = () => {
      console.log(this.state.selectedRowKeys, '-----selectedRowKeys-------');
      // onSubmit(this.state.selectedRowKeys);
    };
    const click = () => {
      onSubmit(this.state.selectedRowKeys);
    };
    return (
      <Modal
        title="分配角色"
        visible={isVisible}
        maskClosable={false}
        onOk={click}
        onCancel={onClose}
        width={800}
      >
        <Table
          rowKey="appId"
          showHeader={false}
          columns={columns}
          dataSource={roleItem}
          expandedRowRender={(records: any) => this.expandedRowRender(records)}
          pagination={false}
        />
      </Modal>
    );
  }
}

export default connect(({ role, loading }: ConnectState) => ({
  roleItem: role.list,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(roleTree);
