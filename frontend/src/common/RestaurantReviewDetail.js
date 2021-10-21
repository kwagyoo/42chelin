import styled from 'styled-components';

const StoreItemBlock = styled.div`
  width: 800px;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StoreInfoBlock = styled.div`
  flex-direction: column;
  display: flex;
  padding-top: 1rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 4rem;
  border-bottom: 2px solid #e9e9e9;
`;

const StoreHedaer = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

const RestaurantDetail = () => {
  return (
    <StoreItemBlock>
      <StoreHedaer>
        <h2>Storename</h2>
      </StoreHedaer>
      <StoreInfoBlock>
        <span>Store address</span>
        <span>callnum</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default RestaurantDetail;
