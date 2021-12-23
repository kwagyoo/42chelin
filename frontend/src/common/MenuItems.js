import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const MenuItems = ({ register }) => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'menu']}
                  fieldKey={[fieldKey, 'menu']}
                  rules={[{ required: true, message: '메뉴명을 입력해주세요' }]}
                >
                  <Input placeholder="메뉴명" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  fieldKey={[fieldKey, 'price']}
                  rules={[{ required: true, message: '가격을 입력해주세요' }]}
                >
                  <Input placeholder="가격" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default MenuItems;
