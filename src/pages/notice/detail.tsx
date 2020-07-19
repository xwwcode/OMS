import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { detailSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'notice/fetchList',
  FETCH_ITEM: 'notice/fetchItem',
  ADD_ITEM: 'notice/addItem',
  UPDATE_ITEM: 'notice/updateItem',
  DELETE_ITEM: 'notice/deleteItem',
  SWITCH_STATUS: 'notice/switchStatus',
};

interface IProps extends ConnectProps {
  dataScouce: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '货品SKU',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '货品名称',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '通知到货数量',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '货品售价',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '货品进货价',
    dataIndex: 'name',
    // width: 130,
  },
  {
    title: '货品进货金额',
    dataIndex: 'name',
    // width: 130,
  },
];

const Notice: React.FC<IProps> = ({ dataScouce, loading, dispatch = () => {}, searchData }) => {
  const onFetch = (data: any) => dispatch({ type: ACTIONS.FETCH_LIST, payload: data });

  // useConnectTable连接搜索和分页
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });

  const onAdd = () => {};

  /**
   * 修改
   */
  const onUpdate = (item: any) => {
    console.log(item, '=====item=======');
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(record => [{ name: '移除', onHandler: onUpdate }], [
    onAutoSearch,
  ]);

  return (
    <PageHeaderWrapper title={false}>
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary" onClick={onAdd}>
              添加货品
            </Button>
          </Button.Group>
        }
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={detailSchema} />}
        columns={columns}
        dataSource={dataScouce}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ notice, loading }: ConnectPageState) => ({
  dataScouce: notice.list,
  searchData: notice.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Notice);
