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
  FETCH_LIST: 'applicationAndPage/fetchList',
  FETCH_ITEM: 'applicationAndPage/fetchItem',
  ADD_ITEM: 'applicationAndPage/addItem',
  UPDATE_ITEM: 'applicationAndPage/updateItem',
  DELETE_ITEM: 'applicationAndPage/deleteItem',
  SWITCH_STATUS: 'applicationAndPage/switchStatus',
};

interface IProps extends ConnectProps {
  appList: any[];
  loading: boolean;
  searchData: ISearchData;
}

const columns = [
  {
    title: '应用名称',
    dataIndex: 'appName',
  },
  {
    title: '应用key',
    dataIndex: 'appKey',
  },
  {
    title: '公钥',
    dataIndex: 'publicKey',
  },
  {
    title: '私钥',
    dataIndex: 'privateKey',
  },
  {
    title: '授权码',
    dataIndex: 'authorizationCode',
  },
  {
    title: '应用秘钥',
    dataIndex: 'appSecret',
  },
  {
    title: '所属客户',
    dataIndex: 'customerName',
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

const Page: React.FC<IProps> = ({ appList, loading, dispatch = () => {}, searchData }) => {
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
        style={{ tableLayout: 'fixed' }}
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={searchSchema()} />}
        columns={columns}
        dataSource={appList}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
        ellipsis
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ applicationAndPage, loading }: ConnectPageState) => ({
  appList: applicationAndPage.list,
  searchData: applicationAndPage.searchData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Page);
