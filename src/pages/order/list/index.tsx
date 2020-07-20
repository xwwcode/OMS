import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'orderAndlist/fetchList',
  FETCH_ITEM: 'orderAndlist/fetchItem',
  ADD_ITEM: 'orderAndlist/addItem',
  UPDATE_ITEM: 'orderAndlist/updateItem',
  DELETE_ITEM: 'orderAndlist/deleteItem',
  SWITCH_STATUS: 'orderAndlist/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    // width: 130,
  },

  { title: '创建时间', dataIndex: 'creationTime', width: 170 },
];

const List: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
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
          <span>
            <Button.Group size="small">
              <Button type="primary" onClick={onAdd}>
                新建订单
              </Button>
            </Button.Group>
            &nbsp;&nbsp;
            <Button.Group size="small">
              <Button type="primary" onClick={onAdd}>
                导入订单
              </Button>
            </Button.Group>
            &nbsp;&nbsp;
            <Button.Group size="small">
              <Button type="primary" onClick={onAdd}>
                批量审核
              </Button>
            </Button.Group>
            &nbsp;&nbsp;
            <Button.Group size="small">
              <Button type="primary" onClick={onAdd}>
                批量锁单
              </Button>
            </Button.Group>
          </span>
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

export default connect(({ orderAndlist, loading }: ConnectPageState) => ({
  dataScouce: orderAndlist.list,
  searchData: orderAndlist.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(List);
