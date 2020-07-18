import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable, useConnectTable, visibleFormModal } from 'utopa-antd-pro';
import { ConnectProps } from '@/models/connect';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema, editSchema } from './schema';
import ImportModel from './importModel';

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
    dataIndex: 'brand',
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

  const [buttonShow, setButtonShow] = useState(false);
  const [commitData, setCommitData] = useState({});
  const [importModelFalg, setImportModelFalg] = useState(false);
  /**
   * 新增
   */
  const onAdd = () => {
    visibleFormModal(editSchema(), {
      title: '新增',
      width: 1000,
      onOk: (data: any) => {
        setCommitData(data);
        setButtonShow(true);
      },
    });
  };

  const addSubmit = () => {
    setButtonShow(false);
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: commitData,
    });
    onAutoSearch();
  };

  /**
   * 修改
   */
  const onUpdate = (item: any) => {
    visibleFormModal(editSchema(item), {
      title: '修改',
      width: 1000,
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
      // {
      //   name: '删除',
      //   onHandler: async (item: any) => {
      //     await dispatch({ type: ACTIONS.DELETE_ITEM, payload: item.id });
      //     onAutoSearch();
      //   },
      // },
      {
        name: '复制',
        onHandler: () => {},
      },
    ],
    [onAutoSearch],
  );

  return (
    <PageHeaderWrapper title={false}>
      {buttonShow && (
        <Modal
          title="提交"
          visible={buttonShow}
          centered
          onOk={addSubmit}
          onCancel={() => setButtonShow(false)}
          okText="确认并复制"
          cancelText="确认"
        >
          <p>确定提交货品信息？</p>
        </Modal>
      )}
      {importModelFalg && (
        <ImportModel
          disables={importModelFalg}
          closeModal={(falg: any) => {
            setImportModelFalg(falg);
          }}
        />
      )}
      <StandardTable
        actions={
          <div>
            <Button.Group size="small">
              <Button type="primary" onClick={onAdd}>
                新增
              </Button>
            </Button.Group>
            &nbsp;&nbsp;
            <Button.Group size="small">
              <Button
                type="primary"
                onClick={() => {
                  setImportModelFalg(true);
                }}
              >
                导入
              </Button>
            </Button.Group>
          </div>
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
