import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'store/fetchList',
  FETCH_ITEM: 'store/fetchItem',
  ADD_ITEM: 'store/addItem',
  UPDATE_ITEM: 'store/updateItem',
  DELETE_ITEM: 'store/deleteItem',
  SWITCH_STATUS: 'store/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '门店名称',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '门店简称',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '店铺地址',
    dataIndex: 'name',
    width: 400,
  },
  {
    title: '所在平台',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '平台授权状态',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '门店负责人',
    dataIndex: 'name',
    // width: 130,
  },
];

const Store: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
  const onFetch = (data: any) => dispatch({ type: ACTIONS.FETCH_LIST, payload: data });

  // useConnectTable连接搜索和分页
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });

  /**
   * 新增
   */
  const onAdd = () => {
    visibleFormModal(editSchema(), {
      title: '新增',
      width: 800,
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
      width: 800,
      onOk: async (data: any) => {
        await dispatch({
          type: ACTIONS.UPDATE_ITEM,
          payload: { ...item, ...data },
        });
        onAutoSearch();
      },
    });
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '修改', onHandler: onUpdate },
      {
        name: '删除',
        onHandler: async (item: any) => {
          await dispatch({ type: ACTIONS.DELETE_ITEM, payload: item.id });
          onAutoSearch();
        },
      },
      {
        name: record.enabled ? '禁用' : '启用',
        onHandler: async (item: any) => {
          await dispatch({
            type: ACTIONS.SWITCH_STATUS,
            payload: { id: item.id, enabled: item.enabled },
          });
          onAutoSearch();
        },
      },
    ],
    [onAutoSearch],
  );

  return (
    <PageHeaderWrapper title={false}>
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary" onClick={onAdd}>
              新增
            </Button>
          </Button.Group>
        }
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={searchSchema} />}
        columns={columns}
        dataSource={dataScouce}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ store, loading }: ConnectPageState) => ({
  dataScouce: store.list,
  searchData: store.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Store);
