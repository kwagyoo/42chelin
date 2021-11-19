import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteStoreReview } from '../lib/api/store';
import ReviewImgView from './ReviewImgView';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setReview } from '../module/posts';

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

const StoreReviewList = ({ store, storeReviews }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
      console.log('deleteStoreReview', res);
      history.go(0);
    } catch (error) {
      console.error(error);
      alert('에러가 발생했습니다. 잠시 뒤 다시 시도해주세요.');
    }
  };

  const goUpdatePage = (review) => {
    const { storeName, storeAddress, userName } = store;
    dispatch(setReview({ storeName, storeAddress, userName, review }));
    history.push('/update');
  };

  return (
    <>
      <ReviewListHeader>
        <div>리뷰</div>
        <div>좋아요를 받은 개수 : {store.storeLikes}</div>
      </ReviewListHeader>
      {storeReviews &&
        storeReviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div className="review_user_name">{review.userName}</div>
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
                    (review.userName === localStorage.getItem('username')
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
                  onClick={() => deleteReview(review)}
                  className={
                    'detail_button ' +
                    (review.userName === localStorage.getItem('username')
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
    </>
  );
};

export default StoreReviewList;
