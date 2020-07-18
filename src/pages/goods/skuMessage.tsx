import React from 'react';
import { Modal, Form, Input, Icon, Button, Row, Col, message, Spin } from 'antd';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {
  value: object;
  skuList: object;
  onChange: (data: any) => void;
  onCancel: (data: any) => void;
  onSubmit: (data: any) => void;
}

class SkuList extends React.PureComponent<IProps> {
  state = {
    skuList: [
      {
        skuCode: '',
        skuName: '',
        skuBarCode: '',
      },
    ],
  };

  componentWillMount() {
    const { value } = this.props;
    this.setState({
      skuList: value,
    });
  }

  copySku = () => {
    const { skuList } = this.state;
    this.setState({
      skuList: skuList.concat({
        skuCode: '',
        skuName: '',
        skuBarCode: '',
      }),
    });
  };

  delete = (index: number) => {
    const { skuList } = this.state;
    this.setState({
      skuList: skuList.splice(index, 1),
    });
  };

  changeSku = (event: any, index: number, serial: number) => {
    const { skuList } = this.state;
    switch (serial) {
      case 0:
        skuList[index].skuCode = event.target.value;
        break;
      case 1:
        skuList[index].skuName = event.target.value;
        break;
      case 2:
        skuList[index].skuBarCode = event.target.value;
        break;
      default:
    }

    this.setState(
      {
        skuList,
      },
      () => {
        this.changeVal();
      },
    );
  };

  changeVal = () => {
    const { onChange } = this.props;
    onChange(this.state.skuList);
  };

  render() {
    const boxStyle = {
      display: 'flex',
      alignItems: 'flex-end',
    };
    const itemStyle = {
      width: '400px',
      marginRight: '5px',
    };
    return (
      <div>
        {this.state.skuList.map((item, index: number) => {
          return (
            <div key={index} style={boxStyle}>
              <div style={itemStyle}>
                <div>货品SKU编码：</div>
                <Input
                  defaultValue={item.skuCode}
                  onChange={$event => this.changeSku($event, index, 0)}
                />
              </div>
              <div style={itemStyle}>
                <div>货品SKU名称：</div>
                <Input
                  defaultValue={item.skuName}
                  onChange={$event => this.changeSku($event, index, 1)}
                />
              </div>
              <div style={itemStyle}>
                <div>货品SKU条码：</div>
                <Input
                  defaultValue={item.skuBarCode}
                  onChange={$event => this.changeSku($event, index, 2)}
                />
              </div>
              {index === 0 ? (
                <div>
                  <Button type="primary" onClick={() => this.copySku()}>
                    复制SKU信息
                  </Button>
                </div>
              ) : (
                <div>
                  <Button type="danger" onClick={() => this.delete(index)}>
                    删除
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
const SkuMessage = Form.create()(SkuList);

export default SkuMessage;
