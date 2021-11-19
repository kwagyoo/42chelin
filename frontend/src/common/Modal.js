import { Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Loading from './Loading';

const AntModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const StyledModal = styled(Modal)`
    .ant-modal-body {
      height: 400px;
    }
  `;
  return (
    <>
      <button onClick={showModal}>Open Modal</button>
      <StyledModal
        visible={visible}
        footer={null}
        closable={false}
        centered={true}
      >
        <Loading loadingText={'Loading ..'} />
      </StyledModal>
    </>
  );
};

export default AntModal;
