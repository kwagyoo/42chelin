import { useHistory } from 'react-router';
import styled from 'styled-components';

const StoreItemBlock = styled.div`
  width: 100%;
  padding-top: 5rem;
`;

const StoreInfoBlock = styled.div`
  flex-direction: column;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #e9e9e9;
`;

const StoreHedaer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9e9e9;
  button {
    border: none;
    background-color: white;
    :hover {
      color: #2f4f4f;
      cursor: pointer;
    }
  }
`;

const StoreReviewDetail = ({ storeList }) => {
  const history = useHistory();
  const GoWritePage = () => {
    history.push(
      `/write?placeName=${storeList.storeName}&id=${storeList.storeID}`,
    );
  };
  return (
    <StoreItemBlock>
      <StoreHedaer>
        <h2>{storeList.storeName}</h2>
        <button onClick={GoWritePage}>리뷰작성</button>
      </StoreHedaer>
      <StoreInfoBlock>
        <span>{storeList.storeAddress}</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
