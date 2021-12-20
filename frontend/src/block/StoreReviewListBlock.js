import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteReview } from '../lib/api/review';
import ReviewImgView from '../block/ReviewImgViewBlock';
import history from '../hoc/history';
import { useDispatch } from 'react-redux';
import { setReview } from '../module/posts';
import AntModal from '../common/Modal';
import { useState } from 'react';
import TokenVerify from '../common/TokenVerify';

const Wrapper = styled.div`
  font-size: 15px;
`;
const ReviewList = styled.div`
  display: flex;
  border-bottom: 1px solid #e9e9e9;
  margin-top: 20px;
  .review_user_name {
    width: 15%;
    font-size: 15px;
    flex-grow: 0;
    @media (max-width: 550px) {
      padding-right: 25%;
    }
  }
`;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ReviewDetail = styled.div`
  width: 70%;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1%;
  .Date {
    color: #9b9b9b;
  }
  img {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .review_info {
    flex-grow: 1;
    width: 90%;
  }
  .review_info .review_text {
    height: 50px;
    overflow: auto;
  }
  .review_detail_buttons {
    width: 90px;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    align-items: start;
  }
  .detail_button p {
    visibility: visible;
  }
  .detail_button p:hover {
    color: gray;
  }
  .detail_button {
    background: none;
    border: none;
    display: block;
  }

  .detail_button:hover {
    cursor: pointer;
  }
  .hide {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .review_detail_buttons {
      width: 60px;
    }
    .detail_button svg {
      visibility: visible;
    }
    .review_detail_buttons p {
      visibility: hidden;
    }
  }
`;
const ImgContainer = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: nowrap;
  overflow: auto;
  overflow-x: auto;
  overflow-y: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  -webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const deleteStoreReview = async (deleteReviewData, history) => {
  try {
    await deleteReview(deleteReviewData);
    return 200;
  } catch (e) {
    if (e.response.status < 500) {
      if (e.response.status === 403) {
        console.error('Token is expired.');
        await TokenVerify(sessionStorage.getItem('clusterName'));
      } else if (e.response.status === 401) {
        alert('기능을 사용할 권한이 없습니다. 이전 페이지로 이동합니다.');
        history.goBack();
      } else {
        alert('잘못된 요청입니다.');
      }
    } else alert('저장에 실패하였습니다.');
    return e.response.status;
  }
};

const StoreReviewList = ({ store, storeReviews, likes }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const deleteStoreReview = async (review) => {
    let status = 200;
    if (!loading) {
      setLoading((loading) => !loading);
      setLoadingText('삭제중..');
      const deleteReviewData = {
        storeID: store.storeID,
        storeName: store.storeName,
        storeAddress: store.storeAddress,
        clusterName: review.clusterName,
        reviewID: review.reviewID,
      };
      do {
        status = await deleteReview(deleteReviewData);
      } while (status !== 200 || status !== 403);
      setLoading((loading) => !loading);
    }
  };

  const goUpdatePage = (review) => {
    const { storeID, storeAddress } = store;
    dispatch(setReview({ storeID, storeAddress, review }));
    history.push('/update');
  };

  return (
    <Wrapper>
      <AntModal visible={loading} loadingText={loadingText} />
      <ReviewListHeader>
        <div>리뷰</div>
        <div>좋아요를 받은 개수 : {likes}</div>
      </ReviewListHeader>
      {storeReviews &&
        storeReviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div className="review_user_name">{review.clusterName}</div>
            <ReviewDetail>
              <div className="review_info">
                <div className="Date">{review.reviewDate}</div>
                <div className="review_text">{review.reviewText}</div>

                <ImgContainer>
                  {review.images &&
                    review.images.map((image, idx) => (
                      <ReviewImgView image={image.imageURL} key={idx} />
                    ))}
                </ImgContainer>
              </div>
              <div className="review_detail_buttons">
                <button
                  onClick={() => goUpdatePage(review)}
                  className={
                    'detail_button ' +
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
                    'detail_button ' +
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
