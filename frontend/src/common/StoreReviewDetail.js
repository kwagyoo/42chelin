import styled from 'styled-components';

const StoreItemBlock = styled.div`
  width: 100%;
  padding-top: 2rem;
`;

const StoreInfoBlock = styled.div`
  flex-direction: column;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #e9e9e9;
`;

const StoreHedaer = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

const StoreReviewDetail = ({ storeList }) => {
  return (
    <StoreItemBlock>
      <StoreHedaer>
        <h2>{storeList.storeName}</h2>
      </StoreHedaer>
      <StoreInfoBlock>
        <span>{storeList.storeAddress}</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
