import React from 'react';
// import ReactDOM from 'react-dom';
import { Modal, Form, Input, Table, message } from 'antd';
import { connect } from 'dva';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import AppSelect from '@/components/permissionTree/appLication';
import { ConnectProps, ConnectState } from '@/models/connect';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const { Search } = Input;

const isDesable = !!(
  storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
);

const ACTIONS = {
  FETCH_ALL: 'permissionAndPage/fetchList',
};

interface paramProps {
  customerId: any;
  appId: any;
}

interface IProps extends ConnectProps {
  perList: ConnectState['permissionAndPage']['list'];
  loading: boolean;
  schema?: any;
  falg: boolean;
  form: any;
  addOrEdit: boolean;
  submits: (obj: any, perId: any) => void;
  cancels: () => void;
}

class MenuForm extends React.PureComponent<IProps> {
  state = {
    isShow: false,
    params: {},
    perName: '',
    perId: '',
    appId: '',
    customerId: '',
  };

  columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
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
      title: '更新人',
      dataIndex: 'updator',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'handler',
      render: (text: any, record: any) => (
        <a
          onClick={() => {
            this.onChoose(record);
          }}
        >
          选择
        </a>
      ),
    },
  ];

  componentWillMount() {
    this.getPerList();
  }

  onChoose = (r: any) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      perName: r.name,
      perId: r.id,
      isShow: false,
    });
  };

  getPerList = () => {
    const { dispatch, schema } = this.props;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      params: schema,
      perName: schema.permissionName,
      // eslint-disable-next-line react/no-unused-state
      perId: schema.permissionId,
      appId: schema.appId || '',
      customerId: schema.customerId || storage.getItem(STORAGE_KEY.USER).customerId,
    });
  };

  openPerTree = () => {
    if (!this.state.customerId || !this.state.appId) {
      message.warning('请先选择所属客户和所属应用！');
      return;
    }
    const { dispatch } = this.props;
    if (dispatch) {
      const data = {
        customerId: this.state.customerId,
        appId: this.state.appId,
      };
      dispatch({ type: ACTIONS.FETCH_ALL, payload: data }).then(res => {
        if (res.status === 1) {
          this.setState({
            // eslint-disable-next-line react/no-unused-state
            isShow: true,
          });
        }
      });
    }
  };

  setRolePre = (item: any) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isShow: false,
    });
  };

  closeModel = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isShow: false,
    });
  };

  handlePerOk = () => {
    const { submits } = this.props;
    // eslint-disable-next-line consistent-return
    this.props.form.validateFields((rule: any, val: any) => {
      if (rule) {
        return rule;
      }
      this.setState({ params: val }, () => {
        submits(this.state.params, this.state.perId);
      });
    });
  };

  cancelPerOk = () => {
    const { cancels } = this.props;
    cancels();
  };

  handleOk = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isShow: false,
    });
  };

  onload = () => {};

  isSelect = (data: any) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      appId: data,
    });
  };

  render() {
    const { falg, form, perList, addOrEdit } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 13 },
      },
    };
    return (
      <Modal
        title="分配权限"
        visible={falg}
        maskClosable={false}
        width={500}
        onOk={this.handlePerOk}
        onCancel={this.cancelPerOk}
      >
        <Form {...formItemLayout}>
          <Form.Item label="菜单名称">
            {getFieldDecorator('name', {
              initialValue: addOrEdit ? '' : this.state.params.name,
              rules: [
                {
                  required: true,
                  message: '请输入菜单名称!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="url">
            {getFieldDecorator('url', {
              initialValue: addOrEdit ? '' : this.state.params.url,
              // rules: [
              //   {
              //     required: true,
              //     message: '请输入菜单路径!',
              //   },
              // ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="图标">
            {getFieldDecorator('icon', {
              initialValue: addOrEdit ? '' : this.state.params.icon,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="排序号">
            {getFieldDecorator('orderNo', {
              initialValue: addOrEdit ? 0 : this.state.params.orderNo,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="所属客户">
            {getFieldDecorator('customerId', {
              initialValue: this.state.params.customerId
                ? this.state.params.customerId
                : storage.getItem(STORAGE_KEY.USER).customerId,
              rules: [
                {
                  required: true,
                  message: '请选择所属客户!',
                },
              ],
            })(<CustomerList isDesabled={isDesable || !!this.state.params.customerId} />)}
          </Form.Item>
          <Form.Item label="所属应用">
            {getFieldDecorator('appId', {
              initialValue: this.state.params.appId || undefined,
              rules: [
                {
                  required: true,
                  message: '请选择所属应用!',
                },
              ],
            })(<AppSelect disabled={!!this.state.params.appId} onSelect={this.isSelect} />)}
          </Form.Item>
          <Form.Item label="权限">
            {getFieldDecorator('permissionIdName', {
              initialValue: this.state.perName,
              rules: [
                {
                  required: true,
                  message: '请选择权限!',
                },
              ],
            })(
              <Search
                placeholder="请选择权限"
                enterButton="选择"
                size="large"
                readOnly
                onSearch={this.openPerTree}
              />,
            )}
          </Form.Item>
        </Form>
        <Modal
          title="分配权限"
          visible={this.state.isShow}
          maskClosable={false}
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleOk}
        >
          <Table rowKey="id" columns={this.columns} dataSource={perList} pagination={false} />
        </Modal>
      </Modal>
    );
  }
}

const MenuForms = Form.create()(MenuForm);
export default connect(({ permissionAndPage, loading }: ConnectState) => ({
  perList: permissionAndPage.list,
  loading: loading.effects[ACTIONS.FETCH_ALL],
}))(MenuForms);
