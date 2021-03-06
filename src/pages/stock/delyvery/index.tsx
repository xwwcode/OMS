import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'delyvery/fetchList',
  FETCH_ITEM: 'delyvery/fetchItem',
  ADD_ITEM: 'delyvery/addItem',
  UPDATE_ITEM: 'delyvery/updateItem',
  DELETE_ITEM: 'delyvery/deleteItem',
  SWITCH_STATUS: 'delyvery/switchStatus',
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

const Delyvery: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
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
    /* eslint no-underscore-dangle: 0 */
    window.g_app._store.dispatch(routerRedux.push('/stock/delyvery/detail'));
    // visibleFormModal(editSchema(), {
    //   title: '新增',
    //   onOk: async (data: any) => {
    //     await dispatch({
    //       type: ACTIONS.ADD_ITEM,
    //       payload: data,
    //     });
    //     onAutoSearch();
    //   },
    // });
  };

  /**
   * 修改
   */
  const onUpdate = (item: any) => {
    /* eslint no-underscore-dangle: 0 */
    window.g_app._store.dispatch(routerRedux.push('/stock/delyvery/detail'));
    // visibleFormModal(editSchema(item), {
    //   title: '修改',
    //   onOk: async (data: any) => {
    //     await dispatch({
    //       type: ACTIONS.UPDATE_ITEM,
    //       payload: Object.assign({}, item, data),
    //     });
    //     onAutoSearch();
    //   },
    // });
  };

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
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary" onClick={onAdd}>
              新建退供出货单
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

export default connect(({ delyvery, loading }: ConnectPageState) => ({
  dataScouce: delyvery.list,
  searchData: delyvery.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Delyvery);
