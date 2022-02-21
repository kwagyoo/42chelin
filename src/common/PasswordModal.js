import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';

const PasswordModal = ({ visible, onChange, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="비밀번호 변경"
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onChange(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={onCancel}
      >
        <Form
          form={form}
          name="form_in_modal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          autoComplete="off"
        >
          <Form.Item
            label="이전 비밀번호"
            name="prevPassword"
            rules={[
              { required: true, message: '이전 비밀번호를 입력해주세요!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="바꿀 비밀번호"
            name="currPassword"
            rules={[
              { required: true, message: '바꿀 비밀번호를 입력해주세요!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PasswordModal;
