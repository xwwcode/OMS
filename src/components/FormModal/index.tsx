/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormList, { IFormSchema } from '@/components/FormList';

import styles from './index.less';

interface IFormMdalProps extends ModalProps {
  schema: IFormSchema[];
  choosePre?: () => Promise<any> | void;
  onOk: (values: any) => Promise<any> | void;
}

// eslint-disable-next-line max-len
const FormModal: React.FC<IFormMdalProps> = ({
  schema,
  onOk,
  onCancel,
  choosePre,
  ...restProps
}) => {
  const form = useRef<WrappedFormUtils>();
  const [loading, setLoading] = useState(false);

  const resetOnOk = (e: any) => {
    if (!loading && onOk && typeof onOk === 'function') {
      return new Promise((resolve, reject) => {
        if (!form.current) return reject();
        return form.current.validateFields((err, values) => {
          if (err) {
            return reject(err);
          }
          let fn;
          try {
            fn = onOk(values);
          } catch (error) {
            console.warn('onOk-错误：');
            console.warn(error);
            return reject();
          }
          if (fn instanceof Promise) {
            setLoading(true);
            return fn
              .then(res => {
                setLoading(false);
                if (res !== false) {
                  resolve(true);
                  // 自动关闭
                  if (onCancel) onCancel(e);
                }
              })
              .catch(error => {
                setLoading(false);
                console.warn(error);
              });
          }
          if (onCancel) onCancel(e);

          return resolve();
        });
      }).catch(err => {
        console.warn('保存表单错误：', err.message || err);
      });
    }
    return false;
  };

  return (
    <Modal
      className={styles.model}
      bodyStyle={{
        overflowY: 'auto',
        maxHeight: '70vh',
      }}
      {...restProps}
      onOk={resetOnOk}
      onCancel={onCancel}
      maskClosable={false}
      okButtonProps={{ loading }}
    >
      <FormList
        formSchema={schema}
        getFormInstance={f => {
          form.current = f;
        }}
      />
    </Modal>
  );
};

export default FormModal;

const destroyFns: any[] = [];

export const visibleFormModal = (schema: IFormSchema[], config: ModalProps = {}) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let modalConfig: ModalProps = {
    okText: '提交',
    cancelText: '取消',
    ...config,
  };

  const render = (formSchema: IFormSchema[], props: any) => {
    ReactDOM.render(<FormModal visible schema={formSchema} {...props} />, div);
  };

  const close = () => {
    modalConfig = {
      ...modalConfig,
      visible: false,
      afterClose: destroy,
    };
    render(schema, modalConfig);
  };

  function destroy(e?: any) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    if (config.onCancel && e && e.triggerCancel) {
      config.onCancel(e);
    }

    for (let i = 0; i < destroyFns.length; i += 1) {
      const fn = destroyFns[i];

      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function update(newSchema: IFormSchema[], newConfig: ModalProps = {}) {
    modalConfig = Object.assign(modalConfig, newConfig);
    render(newSchema, modalConfig);
  }

  modalConfig.onCancel = close;

  render(schema, modalConfig);
  destroyFns.push(close);
  return {
    destroy,
    update,
  };
};

// 销毁所有
export const destroyAll = () => {
  destroyFns.forEach(fn => {
    if (fn && typeof fn === 'function') {
      fn();
    }
  });
};
