import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { SearchForm, useConnectTable, StandardTable } from 'utopa-antd-pro';
import { ISearchData, ConnectPageState } from './model';
import { goodsSchema } from './schema';

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
  visable: boolean;
  onCancel: (v: boolean) => void;
}

const columns = [
  {
    title: '货品名称',
    dataIndex: 'name',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
  },
];

const OrderGoodsDetail: React.FC<IProps> = ({
  dataScouce,
  searchData,
  loading,
  visable,
  onCancel,
  dispatch = () => {},
}) => {
  const onFetch = (data: any) => dispatch({ type: ACTIONS.FETCH_LIST, payload: data });
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });
  const [selectedRowKey, setSelectedRowKey] = useState([]);
  const handleOk = () => {};

  const handleCancel = () => {
    onCancel(false);
  };

  const onChoose = () => {};

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(record => [{ name: '选择', onHandler: onChoose }], [
    onAutoSearch,
  ]);
  return (
    <Modal
      title="选择批量添加的货品"
      width={1200}
      visible={visable}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <StandardTable
        actions={<Button.Group size="small" />}
        searchContent={<SearchForm onSearch={onAutoSearch} formSchema={goodsSchema} />}
        columns={columns}
        dataSource={dataScouce}
        loading={loading}
        pagination={pagination}
        colActions={colActions}
        rowSelection={{
          selectedRowKeys: selectedRowKey,
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(selectedRowKeys, 'selectedRowKeys', selectedRows, 'selectedRows');
            setSelectedRowKey(selectedRowKeys);
          },
        }}
        serialShow={false}
      />
    </Modal>
  );
};

export default connect(({ orderAndlist, loading }: ConnectPageState) => ({
  dataScouce: orderAndlist.goodsList,
  searchData: orderAndlist.searchGoodsData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(OrderGoodsDetail);
