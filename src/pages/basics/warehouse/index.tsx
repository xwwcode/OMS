import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'warehouse/fetchList',
  FETCH_ITEM: 'warehouse/fetchItem',
  ADD_ITEM: 'warehouse/addItem',
  UPDATE_ITEM: 'warehouse/updateItem',
  DELETE_ITEM: 'warehouse/deleteItem',
  SWITCH_STATUS: 'warehouse/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '仓库代码',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '仓库名称',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '仓库类型',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '处理能力(单/天)',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '联系人',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '电话',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '地址',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '状态',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '，默认仓',
    dataIndex: 'name',
    // width: 130,
  },

  { title: '创建时间', dataIndex: 'creationTime', width: 170 },
];

const Warehouse: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
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

export default connect(({ warehouse, loading }: ConnectPageState) => ({
  dataScouce: warehouse.list,
  searchData: warehouse.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Warehouse);
