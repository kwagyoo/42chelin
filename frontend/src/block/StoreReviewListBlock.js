import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteReview } from '../lib/api/review';
import ReviewImgView from '../block/ReviewImgViewBlock';
import { useDispatch } from 'react-redux';
import { setReview } from '../module/posts';
import AntModal from '../common/Modal';
import { useState } from 'react';
import TokenVerify from '../common/TokenVerify';
import { useHistory } from 'react-router-dom';

import { Image } from 'antd';

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
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
  .btn-review-write {
    font-size: 18px;
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
  height: 250px;
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
    .review_img {
      height: 150px;
    }
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

const HiddenImg = styled(Image)`
  display: none;
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
  const [visible, setVisible] = useState(false);

  const deleteStoreReview = async (review) => {
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
      await TokenVerify();
      await manageDeleteReview(deleteReviewData);
      setLoading((loading) => !loading);
      history.push(0);
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
        <div>
          <button className="btn-review-write" onClick={GoWritePage}>
            리뷰작성
          </button>
        </div>
      </ReviewListHeader>
      {storeReviews &&
        storeReviews.map((review, idx) => (
          <ReviewList key={idx}>
            <div className="review_user_name">
              {review.clusterName.substr(0, 1) +
                '*'.repeat(review.clusterName.length - 2) +
                review.clusterName.substr(review.clusterName.length - 1, 1)}
            </div>
            <ReviewDetail>
              <div className="review_info">
                <div className="Date">{review.reviewDate}</div>
                <div className="review_text">{review.reviewText}</div>
                <div className="review_img">
                  {review.images &&
                    review.images.map((image, idx) => {
                      <div>
                        <Image
                          width={200}
                          src={image.imageURL}
                          preview={{ visible: false }}
                          onClick={() => setVisible(true)}
                        />
                        <Image.PreviewGroup
                          preview={{
                            visible,
                            onVisibleChange: (vis) => setVisible(vis),
                          }}
                        >
                          <HiddenImg
                            width={200}
                            height={150}
                            src={image.imageURL}
                            key={idx}
                          />
                        </Image.PreviewGroup>
                      </div>;
                    })}
                </div>
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
