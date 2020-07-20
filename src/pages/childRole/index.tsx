import React, { useState } from 'react';
import { Tag } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, visibleFormModal } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import PermissionTree from '@/components/permissionTree/index';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { searchSchema, editSchema } from './schema';
import { ISearchData, ConnectPageState } from './model';

const ACTIONS = {
  FETCH_LIST: 'childRolePage/fetchList',
  FETCH_ITEM: 'childRolePage/fetchItem',
  ADD_ITEM: 'childRolePage/addItem',
  UPDATE_ITEM: 'childRolePage/updateItem',
  DELETE_ITEM: 'childRolePage/deleteItem',
  SWITCH_STATUS: 'childRolePage/switchStatus',
  ROLE_PERMISSION: 'childRolePage/rolePermission',
};

interface IProps extends ConnectProps {
  roleList: any[];
  loading: boolean;
  searchData: ISearchData;
  defaultAppVal: any;
}

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    // width: 130,
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status: any) => (
      <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '启用' : '禁用'}</Tag>
    ),
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '修改人',
    dataIndex: 'updator',
  },
  { title: '修改时间', dataIndex: 'updateTime' },
];

const Page: React.FC<IProps> = ({
  roleList,
  loading,
  dispatch = () => {},
  searchData,
  defaultAppVal,
}) => {
  const [permissinParam, setPermissinParam] = useState({});
  const onFetch = (data: any) => {
    setPermissinParam({
      customerId: data.customerId,
      appId: data.appId,
    });
    const { customerId, appId } = data;
    return dispatch({
      type: ACTIONS.FETCH_LIST,
      payload: {
        ...data,
        mainUserId: storage.getItem(STORAGE_KEY.USER).userId,
        customerId: customerId || storage.getItem(STORAGE_KEY.USER).customerId,
        appId: appId || defaultAppVal,
      },
    });
  };

  // useConnectTable连接搜索和分页
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
    immediate: !!permissinParam.appId || !!defaultAppVal,
  });

  const [permiss, setPermiss] = useState(false);
  const [listMessage, setListMessage] = useState({});
  /**
   * 新增
   */
  const onAdd = () => {
    const obj = {
      isAdd: true, // 新增时switch 不可选
      status: 1,
    };
    visibleFormModal(editSchema(obj), {
      title: '新增',
      onOk: async (data: any) => {
        await dispatch({
          type: ACTIONS.ADD_ITEM,
          payload: { ...data, mainUserId: storage.getItem(STORAGE_KEY.USER).userId },
        });
        onAutoSearch();
      },
    });
  };

  /**
   * 修改
   */
  const onUpdate = (item: any) => {
    visibleFormModal(editSchema(item), {
      title: '修改',
      onOk: async (data: any) => {
        await dispatch({
          type: ACTIONS.UPDATE_ITEM,
          payload: { ...item, ...data, mainUserId: storage.getItem(STORAGE_KEY.USER).userId },
        });
        onAutoSearch();
      },
    });
  };

  /**
   * 分配权限
   */
  const assignPermissions = (item: any) => {
    setListMessage(item);
    setPermiss(true);
  };
  const setRolePre = (item: any) => {
    dispatch({
      type: ACTIONS.ROLE_PERMISSION,
      payload: item,
    });
    setPermiss(false);
  };
  const closeModel = () => {
    setPermiss(false);
  };
  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '修改', onHandler: onUpdate },
      {
        name: '分配权限',
        onHandler: assignPermissions,
        icon: 'sync',
      },
    ],
    [onAutoSearch],
  );

  return (
    <PageHeaderWrapper title={false}>
      {permiss ? (
        <div>
          <PermissionTree
            isVisible={permiss}
            onSubmit={setRolePre}
            onClose={closeModel}
            params={listMessage}
            permissinParam={permissinParam}
          />
        </div>
      ) : (
        ''
      )}
      <StandardTable
        actions={[
          { name: '新增', size: 'small', type: 'primary', permission: 'add', onClick: onAdd },
        ]}
        searchContent={
          <SearchForm onSearch={onAutoSearch} formSchema={searchSchema(defaultAppVal)} />
        }
        columns={columns}
        dataSource={roleList}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
        ellipsis
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ childRolePage, permission, loading }: ConnectPageState) => ({
  roleList: childRolePage.list,
  searchData: childRolePage.searchData,
  defaultAppVal: permission.defaultAppVal,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Page);
