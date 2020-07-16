import React, { useCallback, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { FormLayout, GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form/FormItem';
import {
  FormComponentProps,
  ValidationRule,
  FormCreateOption,
  ValidateCallback,
} from 'antd/lib/form';

const FormItem = Form.Item;

interface IValidationRule extends ValidationRule {
  target?: 'selected';
}

export interface IFormSchema extends FormItemProps {
  key?: string | number;
  field?: string;
  style?: React.CSSProperties;
  required?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;

  before?: React.ReactNode;
  after?: React.ReactNode;
  component?: React.ReactNode;
  options?: GetFieldDecoratorOptions;
  col?: ColProps;
  formItemClassName?: string;
  rules?: IValidationRule[];
}

interface FormListProps<V = any> extends FormComponentProps<V> {
  formSchema: IFormSchema[];
  itemCol?: ColProps;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  layout?: FormLayout;
  style?: React.CSSProperties;
  className?: string;
  getFormInstance?: (formInstance: WrappedFormUtils<V>) => void;
  onSubmit?: (err: Error, value: { [key: string]: any }) => void;
  fieldNames?: string[];
}

const defLabelCol = {
  xs: { span: 24 },
  sm: { span: 7 },
};

const defWrapperCol = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 13 },
};

function handlerRule(item: IFormSchema) {
  if (!Array.isArray(item.rules)) return [];

  return item.rules.map(rule => ({
    ...rule,
    message:
      rule.message ||
      (rule.required && `${rule.target === 'selected' ? '请选择' : '请输入'}${item.label}`) ||
      undefined,
  }));
}

const FormList: React.FC<FormListProps> = ({
  labelCol = defLabelCol,
  wrapperCol = defWrapperCol,
  itemCol,
  layout = 'horizontal',
  formSchema,
  form,
  style,
  className,
  onSubmit,
  getFormInstance,
  fieldNames,
}) => {
  const { getFieldDecorator } = form;
  // 提交事件
  const handleFormSubmit = useCallback(
    e => {
      e.preventDefault();
      const callback: ValidateCallback<any> = (err, values) => {
        if (onSubmit) onSubmit(err, values);
      };
      if (fieldNames) {
        form.validateFields(fieldNames, callback);
      } else {
        form.validateFields(callback);
      }
    },
    [onSubmit, form],
  );
  useEffect(() => {
    if (getFormInstance && typeof getFormInstance === 'function') getFormInstance(form);
  }, [form]);

  return (
    <Form style={style} className={className} onSubmit={handleFormSubmit} layout={layout}>
      <Row gutter={8}>
        {formSchema.map(
          (item, index: number) =>
            item && (
              <Col
                {...(item.col || itemCol)}
                key={(item.field || item.label || item.key || index) as string | number}
              >
                <FormItem
                  labelCol={item.labelCol || labelCol}
                  wrapperCol={item.wrapperCol || wrapperCol}
                  label={item.label}
                  help={item.help}
                  extra={item.extra}
                  required={item.required}
                  style={item.style}
                  className={item.formItemClassName}
                  validateStatus={item.validateStatus}
                >
                  {item.before || null}
                  {item.component &&
                    (item.field
                      ? getFieldDecorator(item.field, {
                          rules: handlerRule(item),
                          ...(item.options || {}),
                        })(item.component)
                      : item.component)}
                  {item.after || null}
                </FormItem>
              </Col>
            ),
        )}
      </Row>
    </Form>
  );
};

export default Form.create<FormListProps>()(FormList);

export const createFromListUesOptions = (formCreateOption: FormCreateOption<FormListProps>) =>
  Form.create<FormListProps>(formCreateOption)(FormList);
