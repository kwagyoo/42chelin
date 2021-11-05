import styled from 'styled-components';
import ReviewImgView from './ReviewImgView';

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

const ImgWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
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
              <ImgWrapper>
                {JSON.parse(review.images).map((image, idx) => (
                  <ReviewImgView image={image} key={idx} />
                ))}
              </ImgWrapper>
            </ReviewDetail>
          </ReviewList>
        ))}
    </>
  );
};

export default StoreReviewList;
