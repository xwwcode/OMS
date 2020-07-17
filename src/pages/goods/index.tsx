import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'goods/fetchList',
  FETCH_ITEM: 'goods/fetchItem',
  ADD_ITEM: 'goods/addItem',
  UPDATE_ITEM: 'goods/updateItem',
  DELETE_ITEM: 'goods/deleteItem',
  SWITCH_STATUS: 'goods/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '货品ID',
    dataIndex: 'id',
    // width: 130,
  },
  {
    title: '货品名称',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '品牌',
    dataIndex: 'card',
    // width: 130,
  },
  {
    title: '产地',
    dataIndex: 'loaction',
    // width: 130,
  },
  { title: '修改日期', dataIndex: 'creationTime', width: 170 },
  {
    title: '库存',
    dataIndex: 'stock',
    // width: 130,
  },
];

const Goods: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
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

export default connect(({ goods, loading }: ConnectPageState) => ({
  dataScouce: goods.list,
  searchData: goods.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Goods);
