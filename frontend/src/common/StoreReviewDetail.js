import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { ToggleLikeStore } from '../lib/api/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';

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

const StoreHeader = styled.div`
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
    padding-bottom: 10px;
    background-color: #fafafa;
  }
  .btn-reviewWrite {
    font-size: 18px;
    background-color: #fafafa;
  }
  .store-header-title {
    display: flex;
  }
`;

const StoreReviewDetail = ({ storeList }) => {
  const [isLike, setIsLike] = useState(storeList.isLike);
  const userName = localStorage.getItem('username');
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
      await ToggleLikeStore(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <StoreItemBlock>
      <StoreHeader>
        <div className="store-header-title">
          <h2>{storeList.storeName}</h2>
          {userName && (
            <button onClick={ToggleLike} className="btn-like">
              {isLike ? (
                <FontAwesomeIcon icon={fasFaHeart} size="lg" color="#c0c0c0" />
              ) : (
                <FontAwesomeIcon icon={farFaHeart} size="lg" color="#808080" />
              )}
            </button>
          )}
        </div>
        <div>
          <button className="btn-reviewWrite" onClick={GoWritePage}>
            리뷰작성
          </button>
        </div>
      </StoreHeader>
      <StoreInfoBlock>
        <span>{storeList.storeAddress}</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
