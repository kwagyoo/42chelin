import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { ToggleLikeStore } from '../lib/api/store';

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
      color: gray;
      cursor: pointer;
    }
  }
  .btn-like {
    background-color: gray;
  }
`;

const StoreReviewDetail = ({ storeList }) => {
  const [isLike, setIsLike] = useState(false);
  const history = useHistory();
  const GoWritePage = () => {
    history.push(
      `/write?placeName=${storeList.storeName}&id=${storeList.storeID}`,
    );
  };

  const ToggleLike = async () => {
    setIsLike(!isLike);
    const data = {
      token: localStorage.getItem('token'),
      storeName: storeList.storeName,
      storeAddress: storeList.storeAddress,
      userName: localStorage.getItem('username'),
      isLike: !isLike,
    };
    try {
      const res = await ToggleLikeStore(data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <StoreItemBlock>
      <StoreHedaer>
        <h2>{storeList.storeName}</h2>
        <div>
          <button onClick={ToggleLike} className="btn-like">
            좋아요 버튼
          </button>
          <button onClick={GoWritePage}>리뷰작성</button>
        </div>
      </StoreHedaer>
      <StoreInfoBlock>
        <span>{storeList.storeAddress}</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
