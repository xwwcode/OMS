import React from 'react';
import { Modal, Form, Input, Icon, Button, Row, Col, message, Spin, Upload } from 'antd';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {
  visible: boolean;
  onChange: (data: any) => void;
  closeModal: (data: any) => void;
}

class Modals extends React.PureComponent<IProps> {
  handleOk = () => {};

  handleCancel = () => {
    const { closeModal } = this.props;
    closeModal(false);
  };

  render() {
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Modal
        title="请导入文件"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="模板下载"
      >
        <Upload {...props}>
          <Button>
            <Icon type="upload" />
            选择本地文件
          </Button>
        </Upload>
        ,
      </Modal>
    );
  }
}
const ImportModal = Form.create()(Modals);

export default ImportModal;
