import { Space } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DefalutImg from '../image/default.png';

const StyledImg = styled.img`
  width: 86px;
  height: 86px;
`;

const StoreBlock = (store) => {
  const history = useHistory();
  const { storeAddress, storeName, storeID, storeImageURL, storeCategoryName } =
    store.store;
  const goDetail = () => {
    history.push(`/detail?storeID=${storeID}&storeAddress=${storeAddress}`);
  };
  return (
    <Space style={{ textAlign: 'left' }} onClick={() => goDetail(store)}>
      <Space>
        <StyledImg src={storeImageURL ? storeImageURL : DefalutImg} alt="img" />
      </Space>
      <Space direction="vertical">
        <div>{storeName}</div>
        <div>{storeCategoryName}</div>
      </Space>
    </Space>
  );
};

export default StoreBlock;
