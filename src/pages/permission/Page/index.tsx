import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, visibleFormModal } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema, addSchema } from './schema';
import FormModal from './addModal';

const ACTIONS = {
  FETCH_LIST: 'permissionAndPage/fetchList',
  FETCH_ITEM: 'permissionAndPage/fetchItem',
  ADD_ITEM: 'permissionAndPage/addItem',
  UPDATE_ITEM: 'permissionAndPage/updateItem',
  DELETE_ITEM: 'permissionAndPage/deleteItem',
  SWITCH_STATUS: 'permissionAndPage/switchStatus',
};

interface IProps extends ConnectProps {
  permissionList: any[];
  loading: boolean;
  searchData: ISearchData;
  defaultAppVal: any;
}

const columns = [
  {
    title: '权限名称',
    dataIndex: 'name',
  },
  {
    title: '权限key',
    dataIndex: 'permissionKey',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
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
    ellipsis: true,
  },
  {
    title: '修改人',
    dataIndex: 'updator',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
];

const Page: React.FC<IProps> = ({
  permissionList,
  loading,
  dispatch = () => {},
  searchData,
  defaultAppVal,
}) => {
  const [permissinParam, setPermissionParam] = useState({});
  const [modelIsShow, setModelIsShow] = useState(false);
  const [paramMsg, setParamMsg] = useState({});
  const onFetch = (data: any) => {
    setPermissionParam({
      customerId: data.customerId,
      appId: data.appId,
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
  const { onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
    immediate: !!permissinParam.appId || !!defaultAppVal,
  });

  /**
   * 新增
   */
  const onAdd = (item: any) => {
    setParamMsg(item);
    setModelIsShow(true);

    // visibleFormModal(addSchema(item), {
    //   title: '新增',
    //   onOk: async (data: any) => {
    //     const param = Object.assign({}, data);
    //     param.parentPermissionId = item.id;
    //     await dispatch({
    //       type: ACTIONS.ADD_ITEM,
    //       payload: param,
    //     });
    //     onAutoSearch();
    //   },
    // });
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

  const onClose = (falg: boolean) => {
    setModelIsShow(false);
    if (falg) {
      onAutoSearch();
    }
  };

  const onSubmit = (falg: boolean) => {
    setModelIsShow(false);
    if (falg) {
      onAutoSearch();
    }
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '新增', onHandler: onAdd },
      { name: '修改', onHandler: onUpdate },
      {
        name: '删除',
        onHandler: async (item: any) => {
          await dispatch({ type: ACTIONS.DELETE_ITEM, payload: item.id });
          onAutoSearch();
        },
      },
    ],
    [onAutoSearch],
  );

  return (
    <PageHeaderWrapper title={false}>
      {modelIsShow ? (
        <FormModal visible={modelIsShow} onCancel={onClose} onOk={onSubmit} paramMsg={paramMsg} />
      ) : (
        ''
      )}
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary" onClick={onAdd}>
              新增
            </Button>
          </Button.Group>
        }
        searchContent={
          <SearchForm onSearch={onAutoSearch} formSchema={searchSchema(defaultAppVal)} />
        }
        columns={columns}
        dataSource={permissionList}
        loading={loading}
        colActions={colActions}
        indentSize={10}
        ellipsis
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ permissionAndPage, permission, loading }: ConnectPageState) => ({
  permissionList: permissionAndPage.list,
  searchData: permissionAndPage.searchData,
  defaultAppVal: permission.defaultAppVal,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Page);
