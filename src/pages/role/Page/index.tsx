import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, visibleFormModal } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import PermissionTree from '@/components/permissionTree/index';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { searchSchema, editSchema, childSchema } from './schema';
import { ISearchData, ConnectPageState } from './model';

const ACTIONS = {
  FETCH_LIST: 'roleAndPage/fetchList',
  FETCH_ITEM: 'roleAndPage/fetchItem',
  ADD_ITEM: 'roleAndPage/addItem',
  UPDATE_ITEM: 'roleAndPage/updateItem',
  DELETE_ITEM: 'roleAndPage/deleteItem',
  SWITCH_STATUS: 'roleAndPage/switchStatus',
  ROLE_PERMISSION: 'roleAndPage/rolePermission',
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
      appId: data.appId || defaultAppVal,
    });
    const { customerId, appId } = data;
    const paramData = {
      ...data,
      customerId: customerId || storage.getItem(STORAGE_KEY.USER).customerId,
      appId: appId || defaultAppVal,
    };
    return dispatch({ type: ACTIONS.FETCH_LIST, payload: paramData });
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
    visibleFormModal(editSchema(obj, defaultAppVal), {
      title: '新增',
      onOk: async (data: any) => {
        await dispatch({
          type: ACTIONS.ADD_ITEM,
          payload: data,
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
          payload: Object.assign({}, item, data),
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
   * 新增子角色
   */
  // const addChildRole = (item: any) => {
  //   const param = Object.assign({}, item)
  //   param.parentRoleName = item.roleName || ''
  //   param.roleName = ''
  //   visibleFormModal(childSchema(param), {
  //     title: '新增子角色',
  //     onOk: async (data: any) => {
  //       data.parentRoleId = param.id
  //       await dispatch({
  //         type: ACTIONS.ADD_ITEM,
  //         payload: Object.assign({}, data),
  //       });
  //       onAutoSearch();
  //     },
  //   });
  // }
  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '修改', onHandler: onUpdate },
      // {
      //   name: '删除',
      //   onHandler: async (item: any) => {
      //     await dispatch({ type: ACTIONS.DELETE_ITEM, payload: item.id });
      //     onAutoSearch();
      //   },
      // },
      {
        name: '分配权限',
        onHandler: assignPermissions,
        icon: 'sync',
      },
      // {
      //   name: '新增角色',
      //   onHandler: addChildRole,
      //   icon: 'user'
      // }
      // {
      //   name: record.enabled ? '禁用' : '启用',
      //   onHandler: async (item: any) => {
      //     await dispatch({
      //       type: ACTIONS.SWITCH_STATUS,
      //       payload: { id: item.id, enabled: item.enabled },
      //     });
      //     onAutoSearch();
      //   },
      // },
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
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ roleAndPage, permission, loading }: ConnectPageState) => ({
  roleList: roleAndPage.list,
  searchData: roleAndPage.searchData,
  defaultAppVal: permission.defaultAppVal,
  loading: loading.effects[ACTIONS.FETCH_LIST] || loading.effects[ACTIONS.ROLE_PERMISSION],
}))(Page);
