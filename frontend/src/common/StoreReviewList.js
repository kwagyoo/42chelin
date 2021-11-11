import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteStoreReview } from '../lib/api/store';
import ReviewImgView from './ReviewImgView';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setReview } from '../module/posts';
import { loadImageFromS3 } from '../lib/api/aws';
import { useEffect, useState } from 'react';

const ReviewList = styled.div`
  display: flex;
  border-bottom: 1px solid #e9e9e9;
  margin-top: 20px;
  .review_user_name {
    flex-grow: 0;
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
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 3%;
  .Date {
    color: #9b9b9b;
  }
  img {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .review_detail_buttons button {
    background: none;
    border: none;
  }
  .review_detail_buttons button:hover {
    cursor: pointer;
  }
`;
const ImgWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StoreReviewList = ({ store, storeReviews }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState('');

  const deleteReview = async (review) => {
    try {
      const userToken = localStorage.getItem('token');
      const deleteReviewData = {
        token: userToken,
        storeName: store.storeName,
        storeAddress: store.storeAddress,
        userName: review.userName,
        reviewDate: review.reviewDate,
      };
      const res = await deleteStoreReview(deleteReviewData);

      history.go(0);
    } catch (error) {
      console.error(error);
      alert('에러가 발생했습니다. 잠시 뒤 다시 시도해주세요.');
    }
  };

  const goUpdatePage = (review) => {
    const { storeName, storeAddress, userName, reviewDate } = store;
    dispatch(
      setReview({ storeName, storeAddress, userName, reviewDate, review }),
    );
    history.push('/edit');
  };

  const imageTest = async () => {
    const FixedReview = await Promise.all(
      storeReviews.map(async (review) => {
        const parsedImages = JSON.parse(review.images);
        const imageURLs = await Promise.all(
          parsedImages.map(async (image) => {
            return await loadImageFromS3(image);
          }),
        );
        return { ...review, images: imageURLs };
      }),
    );
    setReviews(FixedReview);
  };
  useEffect(() => {
    imageTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReviewListHeader>
        <div>리뷰</div>
        <div>좋아요 개수 출력</div>
      </ReviewListHeader>
      {reviews &&
        reviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div className="review_user_name">{review.userName}</div>
            <ReviewDetail>
              <div>
                <div className="Date">{review.reviewDate}</div>
                <div>{review.reviewText}</div>
                <ImgWrapper>
                  {review.images &&
                    review.images.map((image, idx) => (
                      <ReviewImgView image={image} key={idx} />
                    ))}
                </ImgWrapper>
              </div>
              <div className="review_detail_buttons">
                <button onClick={() => goUpdatePage(review)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: 'red' }}
                    size="lg"
                    className="search"
                  />
                </button>
                <button onClick={() => deleteReview(review)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: 'black' }}
                    size="lg"
                    className="search"
                  />
                </button>
              </div>
            </ReviewDetail>
          </ReviewList>
        ))}
    </>
  );
};

export default StoreReviewList;
