import styled from 'styled-components';
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
  align-items: center;
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
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background-color: #fafafa;
    .like-num {
      margin-left: 5px;
    }
  }
  .store-header-title {
    display: flex;
    align-items: center;
    .store-name {
      font-size: 25px;
    }
  }
  .btn-review-detail {
    font-size: 18px;
    background-color: #fafafa;
  }
`;

const StoreReviewDetail = ({
  storeList,
  ToggleLike,
  isLike,
  likeButtonDisable,
}) => {
  const clusterName = sessionStorage.getItem('clusterName');
  console.log(storeList);
  return (
    <StoreItemBlock>
      <StoreHeader>
        <div className="store-header-title">
          <div className="store-name">{storeList.storeName}</div>
          {clusterName && (
            <button
              onClick={ToggleLike}
              disabled={likeButtonDisable}
              className="btn-like"
            >
              <div className="like-num">{storeList.storeLikes}</div>
              {isLike ? (
                <FontAwesomeIcon icon={fasFaHeart} size="lg" color="#c0c0c0" />
              ) : (
                <FontAwesomeIcon icon={farFaHeart} size="lg" color="#808080" />
              )}
            </button>
          )}
        </div>
        {/* 이후 필요해지면 다시 살리기 <button className="btn-review-detail">가게정보 작성</button> */}
      </StoreHeader>

      <StoreInfoBlock>
        <span>주소 : {storeList.storeAddress}</span>
        <span>분류 : {storeList.storeCategoryName}</span>
        <span>전화번호 : </span>
        <span>메뉴</span>
      </StoreInfoBlock>
    </StoreItemBlock>
  );
};

export default StoreReviewDetail;
