import React from 'react';
import { Modal, Form, Input, Icon, Button, Row, Col, message, Spin } from 'antd';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import CustomerList from '@/components/SelectAnyFormItem/selectCustomerhouse';
import AppList from '@/components/Application/index';
import storage from '@/utils/storage';
import { STORAGE_KEY } from '@/common/storage';

const isDesable = !!(
  storage.getItem(STORAGE_KEY.TOKEN) && storage.getItem(STORAGE_KEY.TOKEN).isSuperAdmin === 0
);

const { TextArea } = Input;

const ACTIONS = {
  ADD_ITEM: 'permissionAndPage/addItem',
};

interface IProps extends ConnectProps {
  visible: boolean;
  loading: boolean;
  paramMsg: object;
  onCancel: (data: any) => void;
  onSubmit: (data: any) => void;
}

class PerModal extends React.PureComponent<IProps> {
  state = {
    id: 0,
    isAddFalg: false,
  };

  handleSubmit = e => {
    const { dispatch, onOk, paramMsg } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.keys.forEach((item, index) => {
          const param = Object.assign(
            {},
            {
              customerId: values.customerId,
              appId: values.appId,
              remark: values[`remark${item}`],
              name: values[`name${item}`],
              permissionKey: values[`permissionKey${item}`],
              parentPermissionId: paramMsg.id || undefined,
            },
          );
          if (dispatch) {
            dispatch({
              type: ACTIONS.ADD_ITEM,
              payload: param,
            }).then(res => {
              if (res) {
                this.setState({
                  isAddFalg: true,
                });
                if (values.keys.length > 1) {
                  this.remove(item);
                }
                if (index === values.keys.length - 1) {
                  message.success('添加成功');
                  onOk(this.state.isAddFalg);
                }
              } else {
                message.error(`第${index}条添加失败，请重新操作`);
              }
            });
          }
        });
      }
    });
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel(this.state.isAddFalg);
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const { id } = this.state;
    this.setState(
      {
        id: id + 1,
      },
      () => {
        const nextKeys = keys.concat(this.state.id);
        form.setFieldsValue({
          keys: nextKeys,
        });
      },
    );
  };

  onSubmit = (key, index) => {
    const { dispatch, paramMsg } = this.props;
    this.props.form.validateFieldsAndScroll(
      ['customerId', 'appId', `remark${key}`, `name${key}`, `permissionKey${key}`],
      (err, values) => {
        if (!err) {
          const param = Object.assign(
            {},
            {
              customerId: values.customerId,
              appId: values.appId,
              remark: values[`remark${key}`],
              name: values[`name${key}`],
              permissionKey: values[`permissionKey${key}`],
              parentPermissionId: paramMsg.id || undefined,
            },
          );
          if (dispatch) {
            dispatch({
              type: ACTIONS.ADD_ITEM,
              payload: param,
            }).then(res => {
              if (res) {
                message.success('添加成功');
                this.setState({
                  isAddFalg: true,
                });
                this.remove(key);
              }
            });
          }
        }
      },
    );
  };

  render() {
    const { visible, loading, paramMsg } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
    getFieldDecorator('keys', { initialValue: [this.state.id] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Row key={k}>
        <Col span={10}>
          <Form.Item label="权限名称">
            {getFieldDecorator(`name${k}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  message: '请输入权限名称',
                },
              ],
            })(<Input placeholder="请输入权限名称" style={{ width: '200px' }} />)}
          </Form.Item>
        </Col>
        <Col span={14}>
          <Row>
            <Col span={18}>
              <Form.Item label="权限key">
                {getFieldDecorator(`permissionKey${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      message: '请输入权限key',
                    },
                  ],
                })(<Input placeholder="请输入权限key" style={{ width: '200px' }} />)}
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginTop: '10px' }}>
              {keys.length > 1 ? (
                <span>
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.remove(k)}
                  />
                  <Icon
                    className="dynamic-delete-button"
                    type="plus-circle"
                    theme="twoTone"
                    style={{ marginRight: '10px' }}
                    onClick={() => this.add()}
                  />
                  <Button type="primary" size="small" onClick={() => this.onSubmit(k, index)}>
                    提交
                  </Button>
                </span>
              ) : (
                <Icon
                  className="dynamic-delete-button"
                  type="plus-circle"
                  theme="twoTone"
                  onClick={() => this.add()}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Form.Item label="备注" style={{ width: '530px', marginLeft: '-65px' }}>
            {getFieldDecorator(`remark${k}`, {})(<TextArea rows={4} />)}
          </Form.Item>
        </Col>
      </Row>
    ));
    return (
      <Spin spinning={loading}>
        <Modal
          title="新增"
          visible={visible}
          width={800}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <Form {...formItemLayout}>
            <Row style={{ marginLeft: '-16px' }}>
              <Form.Item label="所属客户" style={{ width: '370px' }}>
                {getFieldDecorator('customerId', {
                  initialValue: paramMsg.customerId || storage.getItem(STORAGE_KEY.USER).customerId,
                  rules: [
                    {
                      required: true,
                      message: '请选择所属客户!',
                    },
                  ],
                })(<CustomerList isDesabled={isDesable} />)}
              </Form.Item>
              <Form.Item label="所属应用" style={{ width: '370px' }}>
                {getFieldDecorator('appId', {
                  initialValue: paramMsg.appId || undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择所属应用!',
                    },
                  ],
                })(<AppList disabled={!!paramMsg.appId} />)}
              </Form.Item>
            </Row>
            {formItems}
          </Form>
        </Modal>
      </Spin>
    );
  }
}
const AddPerModal = Form.create()(PerModal);
export default connect(({ loading }: ConnectPageState) => ({
  loading: loading.effects[ACTIONS.FETCH_LIST],
}))(AddPerModal);
