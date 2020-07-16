import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SearchForm, StandardTable } from 'utopa-antd-pro';
import useConnectTable from '@/components/SearchForm/useConnectTable';
import { ConnectProps } from '@/models/connect';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';
import { ISearchData, ConnectPageState } from './model';
import { searchSchema } from './schema';
import MenuForms from './menuForm';

const ACTIONS = {
  FETCH_LIST: 'menu/fetchList',
  FETCH_ITEM: 'menu/fetchItem',
  ADD_ITEM: 'menu/addItem',
  UPDATE_ITEM: 'menu/updateItem',
  DELETE_ITEM: 'menu/deleteItem',
  SWITCH_STATUS: 'menu/switchStatus',
};

interface IProps extends ConnectProps {
  menuList: any[];
  loading: boolean;
  searchData: ISearchData;
  defaultAppVal: any;
}

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 'auto',
  },
  {
    title: 'url',
    dataIndex: 'url',
    ellipsis: true,
  },
  {
    title: '所属应用',
    dataIndex: 'appName',
  },
  {
    title: '修改人',
    dataIndex: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    title: '修改人',
    dataIndex: 'updator',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
];

const Menu: React.FC<IProps> = ({
  menuList,
  loading,
  dispatch = () => {},
  searchData,
  defaultAppVal,
}) => {
  const [paramSearch, setParamSearch] = useState({});
  useEffect(() => {
    setParamSearch({
      appId: defaultAppVal,
      customerId: storage.getItem(STORAGE_KEY.USER).customerId,
    });
  }, [defaultAppVal]);
  const onFetch = (data: any) => {
    setParamSearch({
      // 传入获取权限列表的参数
      appId: data.appId || defaultAppVal,
      customerId: data.customerId || storage.getItem(STORAGE_KEY.USER).customerId,
    });
    const { customerId, appId } = data;
    const paramData = {
      ...data,
      customerId: customerId || storage.getItem(STORAGE_KEY.USER).customerId,
      appId: appId || defaultAppVal,
    };
    return dispatch({ type: ACTIONS.FETCH_LIST, payload: paramData });
  };

  // useConnectTable连接搜索和分页
  const { onAutoSearch } = useConnectTable(searchData, {
    onFetch,
    actionType: ACTIONS.FETCH_LIST,
    immediate: !!paramSearch.appId || !!defaultAppVal,
  });

  const [formMessage, setFormMessage] = useState({});
  const [formFlag, setFormFalg] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState(true);
  /**
   * 新增
   */
  const onAdd = (item: any) => {
    if (item.appId) {
      const param = Object.assign({}, item);
      param.parentMenuName = item.name;
      param.name = '';
      setFormMessage(param);
    }
    setAddOrEdit(true); // 判断是新增还是修改
    setFormFalg(true);
  };

  /**
   * 修改
   */
  const onUpdate = (item: any) => {
    setFormMessage(item);
    setAddOrEdit(false); // 判断是新增还是修改
    setFormFalg(true);
  };

  /**
   * 列表项操作
   */
  const colActions = React.useCallback(
    record => [
      { name: '新增', onHandler: onAdd },
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

  const isSubmit = (obj: any, perId: any) => {
    const params = obj;
    params.permissionId = perId;
    const add = async () => {
      params.parentMenuId = formMessage.id;
      await dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: Object.assign({}, params),
      });
      onAutoSearch();
    };
    const edit = async () => {
      params.id = formMessage.id;
      params.parentMenuId = formMessage.parentMenuId;
      await dispatch({
        type: ACTIONS.UPDATE_ITEM,
        payload: Object.assign({}, params),
      });
      onAutoSearch();
    };
    // eslint-disable-next-line no-unused-expressions
    addOrEdit ? add() : edit();
    setFormFalg(false);
  };

  const isCancel = () => {
    setFormFalg(false);
  };

  return (
    <PageHeaderWrapper title={false}>
      {formFlag ? (
        <MenuForms
          schema={formMessage}
          falg={formFlag}
          submits={isSubmit}
          cancels={isCancel}
          addOrEdit={addOrEdit}
        />
      ) : (
        ''
      )}
      <StandardTable
        actions={
          <Button.Group size="small">
            <Button type="primary" onClick={onAdd}>
              新增
            </Button>
          </Button.Group>
        }
        searchContent={
          <SearchForm onSearch={onAutoSearch} formSchema={searchSchema(defaultAppVal)} />
        }
        columns={columns}
        dataSource={menuList}
        loading={loading}
        colActions={colActions}
        indentSize={10}
        ellipsis
        serialShow={false}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ menu, permission, loading, login }: ConnectPageState) => ({
  menuList: menu.list,
  searchData: menu.searchData,
  defaultAppVal: permission.defaultAppVal,
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(Menu);
