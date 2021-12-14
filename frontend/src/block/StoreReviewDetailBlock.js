import { useHistory } from 'react-router';
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
    flex-direction: column-reverse;
    align-items: center;
    background-color: #fafafa;
  }
  .btn-reviewWrite {
    font-size: 18px;
    background-color: #fafafa;
  }
  .store-header-title {
    display: flex;
    align-items: center;
  }
`;

const StoreReviewDetail = ({
  storeList,
  ToggleLike,
  isLike,
  likeButtonDisable,
}) => {
  const clusterName = sessionStorage.getItem('clusterName');
  const history = useHistory();
  const GoWritePage = () => {
    history.push(
      `/write?placeName=${storeList.storeName}&id=${storeList.storeID}`,
    );
  };

  return (
    <StoreItemBlock>
      <StoreHeader>
        <div className="store-header-title">
          <h2>{storeList.storeName}</h2>
          {clusterName && (
            <button
              onClick={ToggleLike}
              disabled={likeButtonDisable}
              className="btn-like"
            >
              <p>좋아요</p>
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
