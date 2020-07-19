import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'brands/fetchList',
  FETCH_ITEM: 'brands/fetchItem',
  ADD_ITEM: 'brands/addItem',
  UPDATE_ITEM: 'brands/updateItem',
  DELETE_ITEM: 'brands/deleteItem',
  SWITCH_STATUS: 'brands/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '品牌名称',
    dataIndex: 'name',
    width: 130,
  },
  {
    title: '品牌简称',
    dataIndex: 'useName',
    width: 130,
  },
  {
    title: '备注',
    dataIndex: 'note',
  },
];

const Brands: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
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
          payload: Object.assign({}, item, data),
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

export default connect(({ brands, loading }: ConnectPageState) => ({
  dataScouce: brands.list,
  searchData: brands.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Brands);
