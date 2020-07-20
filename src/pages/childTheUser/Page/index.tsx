import React, { useState, useEffect } from 'react';
import { Tag, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, visibleFormModal } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import RoleTable from '@/components/RoleTree/index';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { searchSchema, editSchema } from './schema';
import { ISearchData, ConnectPageState } from './model';

const ACTIONS = {
  FETCH_LIST: 'childTheUserPage/fetchList',
  FETCH_ITEM: 'childTheUserPage/fetchItem',
  ADD_ITEM: 'childTheUserPage/addItem',
  UPDATE_ITEM: 'childTheUserPage/updateItem',
  DELETE_ITEM: 'childTheUserPage/deleteItem',
  SWITCH_STATUS: 'childTheUserPage/switchStatus',
  RESET_PWD: 'childTheUserPage/resetPassword',
  HAND_OVER: 'childTheUserPage/handOver',
  DISTRIBUTION_ROLE: 'childTheUserPage/distributionRole',
  DROP_LIST: 'childTheUserPage/dropList',
};

interface IProps extends ConnectProps {
  userList: any[];
  dropLis: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '姓名',
    dataIndex: 'fullName',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status: any) => (
      <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '启用' : '禁用'}</Tag>
    ),
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
  userList,
  dropLis,
  loading,
  dispatch = () => {},
  searchData,
}) => {
  const onFetch = (data: any) => {
    const { customerId } = data;
    const paramData = {
      ...data,
      customerId: customerId || storage.getItem(STORAGE_KEY.USER).customerId,
      parentUserId: storage.getItem(STORAGE_KEY.USER).userId,
    };
    return dispatch({ type: ACTIONS.FETCH_LIST, payload: paramData });
  };
  const dropFetch = () =>
    dispatch({
      type: ACTIONS.DROP_LIST,
      payload: storage.getItem(STORAGE_KEY.USER).customerId,
    });

  useEffect(() => {
    dropFetch();
  }, []);
  // useConnectTable连接搜索和分页
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });

  const [roleSwitch, setRoleSwitch] = useState(false);
  const [roleListParams, setRoleListParams] = useState({});
  const [userId, setUserId] = useState('');
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
          payload: { ...data, parentUserId: storage.getItem(STORAGE_KEY.USER).userId },
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
          payload: { ...item, ...data, parentUserId: storage.getItem(STORAGE_KEY.USER).userId },
        });
        onAutoSearch();
      },
    });
  };

  /**
   * 重置密码
   */
  const resetPassword = (item: any) => {
    dispatch({
      type: ACTIONS.RESET_PWD,
      payload: item.id,
    }).then(res => {
      if (res.status === 1) {
        message.success(`重置密码:${res.data}`);
      }
    });
    onAutoSearch();
  };

  const openRoleForm = (item: any) => {
    const data = {
      subUserId: item.id,
    };
    setRoleListParams(data);
    setRoleSwitch(true);
  };
  /**
   * 分配角色
   */
  const onSubmit = (item: any) => {
    dispatch({
      type: ACTIONS.DISTRIBUTION_ROLE,
      payload: {
        roleIds: item,
        userId: roleListParams.userId,
      },
    });
    setRoleSwitch(false);
  };
  const onCancels = () => {
    setRoleSwitch(false);
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '修改', onHandler: onUpdate },
      {
        name: '重置密码',
        onHandler: resetPassword,
        icon: 'redo',
      },
      {
        name: '分配角色',
        onHandler: openRoleForm,
        icon: 'user',
      },
    ],
    [onAutoSearch],
  );

  return (
    <PageHeaderWrapper title={false}>
      {roleSwitch ? (
        <div>
          <RoleTable
            isVisible={roleSwitch}
            onSubmit={onSubmit}
            onClose={onCancels}
            isParams={roleListParams}
          />
        </div>
      ) : null}
      <StandardTable
        actions={[
          { name: '新增', size: 'small', type: 'primary', permission: 'add', onClick: onAdd },
        ]}
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={searchSchema()} />}
        columns={columns}
        dataSource={userList}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
        ellipsis
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ childTheUserPage, loading }: ConnectPageState) => ({
  userList: childTheUserPage.list,
  searchData: childTheUserPage.searchData,
  dropLis: childTheUserPage.userList,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Page);
