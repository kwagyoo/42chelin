import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteReview } from '../lib/api/review';
import { useDispatch, useSelector } from 'react-redux';
import { setReview } from '../module/posts';
import AntModal from '../common/Modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'antd';

const Wrapper = styled.div`
  font-size: 15px;
`;
const ReviewList = styled.div`
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
  .review-user-name {
    flex-grow: 0;
    flex-basis: 10%;
    font-size: 15px;
  }
`;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 10px;
  .btn-review-write {
    font-size: 1rem;
    background-color: #fafafa;
  }
  button {
    border: none;
    background-color: white;
    :hover {
      color: gray;
      cursor: pointer;
    }
  }
`;

const ReviewDetail = styled.div`
  width: 70%;
  min-height: 250px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1%;
  .Date {
    color: #9b9b9b;
  }
  .review-info {
    flex-grow: 1;
    flex-shrink: 1;
    width: 50%;
    .review-img {
      height: 170px;
    }
    .review-img-container {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: auto;
      height: 100%;
      .ant-image {
        margin-right: 5px;
      }
      .ant-image-img {
        width: 150px;
        height: 150px;
      }
    }
  }
  .review-info .review-text {
    min-height: 50px;
  }
  .review-detail-buttons {
    width: 90px;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-basis: 10%;
    align-items: start;
    justify-content: flex-end;
  }
  .detail-button p {
    visibility: visible;
  }
  .detail-button p:hover {
    color: gray;
  }
  .detail-button {
    background: none;
    border: none;
    display: block;
  }

  .detail-button:hover {
    cursor: pointer;
  }
  .hide {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .review-detail-buttons {
      width: 60px;
    }
    .detail-button svg {
      visibility: visible;
    }
    .review-detail-buttons p {
      visibility: hidden;
    }
  }
`;

const manageDeleteReview = async (deleteReviewData) => {
  try {
    await deleteReview(deleteReviewData);
  } catch (e) {
    if (e.response.status < 500) {
      if (e.response.status === 401) {
        alert('기능을 사용할 권한이 없습니다.');
      } else {
        alert('잘못된 요청입니다.');
      }
    } else alert('저장에 실패하였습니다.');
    return e.response.status;
  }
};

const StoreReviewList = ({ store, storeReviews }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const history = useHistory();
  const { isLogin } = useSelector((state) => state.users);

  const deleteStoreReview = async (review) => {
    if (!loading) {
      setLoading((loading) => true);
      setLoadingText('삭제중..');
      const deleteReviewData = {
        storeID: store.storeID,
        storeName: store.storeName,
        storeAddress: store.storeAddress,
        clusterName: review.clusterName,
        reviewID: review.reviewID,
      };
      await manageDeleteReview(deleteReviewData);
      setLoading((loading) => false);
      window.location.replace(
        `/detail?storeID=${store.storeID}&storeAddress=${store.storeAddress}`,
      );
    }
  };

  const goUpdatePage = (review) => {
    const { storeID, storeAddress, storeName } = store;
    dispatch(setReview({ storeID, storeName, storeAddress, review }));
    history.push('/update');
  };

  const GoWritePage = () => {
    history.push(`/write?placeName=${store.storeName}&id=${store.storeID}`);
  };

  return (
    <Wrapper>
      <AntModal visible={loading} loadingText={loadingText} />
      <ReviewListHeader>
        <div>리뷰</div>
        {isLogin && (
          <div>
            <button className="btn-review-write" onClick={GoWritePage}>
              리뷰 작성
            </button>
          </div>
        )}
      </ReviewListHeader>
      {storeReviews &&
        storeReviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div className="review-user-name">
              {review.clusterName.substr(0, 1) +
                '*'.repeat(review.clusterName.length - 2) +
                review.clusterName.substr(review.clusterName.length - 1, 1)}
            </div>
            <ReviewDetail>
              <div className="review-info">
                <div className="Date">{review.reviewDate}</div>
                <div className="review-text">{review.reviewText}</div>
                <div className="review-img">
                  <div className="review-img-container">
                    {review.images.length > 0 && (
                      <Image.PreviewGroup>
                        {review.images.map((image, idx) => {
                          return (
                            <Image
                              width={150}
                              height={150}
                              src={image.imageURL}
                              key={idx}
                            />
                          );
                        })}
                      </Image.PreviewGroup>
                    )}
                  </div>
                </div>
              </div>
              <div className="review-detail-buttons">
                <button
                  onClick={() => goUpdatePage(review)}
                  className={
                    'detail-button ' +
                    (review.clusterName ===
                    sessionStorage.getItem('clusterName')
                      ? null
                      : 'hide')
                  }
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: 'black' }}
                    size="lg"
                    className="search"
                  />
                  <p className="search">수정</p>
                </button>
                <button
                  onClick={() => deleteStoreReview(review)}
                  className={
                    'detail-button ' +
                    (review.clusterName ===
                    sessionStorage.getItem('clusterName')
                      ? null
                      : 'hide')
                  }
                >
                  <FontAwesomeIcon
                    icon={faEraser}
                    style={{ color: 'red' }}
                    size="lg"
                    className="search"
                  />
                  <p className="search">삭제</p>
                </button>
              </div>
            </ReviewDetail>
          </ReviewList>
        ))}
    </Wrapper>
  );
};

export default StoreReviewList;
