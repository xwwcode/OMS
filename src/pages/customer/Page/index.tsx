import React from 'react';
import { Button, Tag } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, visibleFormModal } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';

const ACTIONS = {
  FETCH_LIST: 'customerAndPage/fetchList',
  FETCH_ITEM: 'customerAndPage/fetchItem',
  ADD_ITEM: 'customerAndPage/addItem',
  UPDATE_ITEM: 'customerAndPage/updateItem',
  DELETE_ITEM: 'customerAndPage/deleteItem',
  SWITCH_STATUS: 'customerAndPage/switchStatus',
};

interface IProps extends ConnectProps {
  customerList: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '客户编码',
    dataIndex: 'customerCode',
    ellipsis: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status: any) => (
      <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '启用' : '禁用'}</Tag>
    ),
  },
  {
    title: '修改人',
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

const Page: React.FC<IProps> = ({ customerList, loading, dispatch = () => {}, searchData }) => {
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
    const obj = {
      isAdd: true, // 新增时switch 不可选
      status: 1,
    };
    visibleFormModal(editSchema(obj), {
      title: '新增客户',
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
      title: '修改客户',
      onOk: async (data: any) => {
        await dispatch({
          type: ACTIONS.UPDATE_ITEM,
          payload: Object.assign({}, item, data, { isEdit: true }),
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
      //       payload: { id: item.id, status: item.status },
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
              新增
            </Button>
          </Button.Group>
        }
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={searchSchema} />}
        columns={columns}
        dataSource={customerList}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
        serialShow={false}
        ellipsis
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ customerAndPage, loading }: ConnectPageState) => ({
  customerList: customerAndPage.list,
  searchData: customerAndPage.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Page);
