import styled from 'styled-components';
import testImg from '../image/15935670615efbe7551de0b.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteStoreData } from '../lib/api/store';

const ReviewList = styled.div`
  display: flex;
  border-bottom: 1px solid #e9e9e9;
  margin-top: 20px;
`;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ReviewDetail = styled.div`
  padding-left: 3%;
  .Date {
    color: #9b9b9b;
  }
  img {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const StoreReviewList = ({ storeReviews }) => {
  return (
    <>
      <ReviewListHeader>
        <div>리뷰</div>
        <div>좋아요 개수 출력</div>
      </ReviewListHeader>
      {storeReviews &&
        storeReviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div>{review.userName}</div>
            <ReviewDetail>
              <div className="Date">{review.reviewDate}</div>
              <div>{review.reviewText}</div>
              <img src={testImg} alt="tmp" />
              <div>
                <button onClick={() => deleteStoreData(review)}>
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
