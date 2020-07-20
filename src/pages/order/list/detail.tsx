import React, { useState } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { detailSchema } from './schema';
import GoodsModal from './goodsModal';

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

const DIVSTYLE = {
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 100px',
};
const BUTTONSTYLE = {
  margin: '0 10px',
};

const OrderDetail: React.FC<IProps> = ({
  dataScouce,
  loading,
  dispatch = () => {},
  searchData,
}) => {
  const onFetch = (data: any) => dispatch({ type: ACTIONS.FETCH_LIST, payload: data });

  // useConnectTable连接搜索和分页
  const { pagination, onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
  });

  const [goodsFalg, setGoodsFalg] = useState(false);

  const onAdd = () => {
    setGoodsFalg(true);
  };

  /**
   * 删除
   */
  const onDelete = (item: any) => {
    console.log(item, '=====item=======');
  };

  const onClose = (param: boolean) => {
    setGoodsFalg(param);
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(record => [{ name: '移除', onHandler: onDelete }], [
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
      <div style={DIVSTYLE}>
        <Button type="primary" style={BUTTONSTYLE}>
          提交
        </Button>
        <Button type="primary" style={BUTTONSTYLE}>
          保存
        </Button>
        <Button type="primary" style={BUTTONSTYLE}>
          重置
        </Button>
        <Button type="primary" style={BUTTONSTYLE}>
          删除出库单
        </Button>
        <Button type="primary" style={BUTTONSTYLE}>
          取消出库单
        </Button>
      </div>
      {goodsFalg && <GoodsModal visable={goodsFalg} onCancel={onClose} />}
    </PageHeaderWrapper>
  );
};

export default connect(({ orderAndlist, loading }: ConnectPageState) => ({
  dataScouce: orderAndlist.detailGoodsList,
  searchData: orderAndlist.searchDetailData,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(OrderDetail);
