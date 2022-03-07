import { Button, Form, Input, Modal, Spin } from 'antd';
import { useState } from 'react';
import { fetchResetPassword } from '../lib/api/auth';

const PwResetModal = ({ setShow }) => {
  const [loading, setLoading] = useState(false);

  const onReset = async (values) => {
    try {
      setLoading(true);
      await fetchResetPassword(values);
      setLoading(false);
      setShow(false);
      alert('입력한 이메일 주소로 발송되었습니다');
    } catch (err) {
      alert('클러스터 네임 혹은 이메일을 확인해주세요');
      setLoading(false);
    }
  };

  return (
    <Modal
      title="비밀번호 초기화"
      centered
      size="lg"
      visible={true}
      onCancel={() => setShow(false)}
      footer={[
        loading ? (
          <Spin />
        ) : (
          <Button form="basic" key="submit" htmlType="submit">
            Submit
          </Button>
        ),
      ]}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="on"
        onFinish={onReset}
      >
        <Form.Item
          label="ClusterName"
          name="clusterName"
          rules={[{ required: true, message: 'Cluster Name을 입력해주세요!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email을 입력해주세요!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PwResetModal;
