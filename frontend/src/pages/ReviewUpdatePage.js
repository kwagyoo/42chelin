import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Header from '../common/Header';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import AntModal from '../common/Modal';
import { updateReview } from '../lib/api/review';
import { uploadImagesToS3 } from '../lib/api/aws';
import { useSelector } from 'react-redux';

const Body = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
`;

const StyledForm = styled.form`
  margin: 10px auto 0px;
  width: 550px;
  padding: 0 10px 0 10px;
  font-family: 'Do Hyeon', sans-serif;
  @media (max-width: 550px) {
    margin-top: 10px;
    width: 100vw;
  }

  > * {
    margin-bottom: 10px;
  }
  textarea {
    vertical-align: top;
  }
  .address_option {
    width: 100px;
    margin-right: 10px;
  }
  .store_like_dislike input {
    display: none;
  }
  .store_like_dislike label {
    margin-left: 5px;
  }
  .store_like_dislike input {
    display: none;
  }
  input[type='radio']:checked + label img {
    border: 1px solid black;
  }
  .write_page_header {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .btn-group {
    display: block;
    text-align: center;
  }
`;

const TargetStoreSearch = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: solid;
  display: flex;
  justify-content: space-between;
  .target_store_info {
    height: 100%;
    display: flex;
    flex-direction: ${(props) => (props.store ? 'column' : 'row')};
    align-items: ${(props) => (props.store ? 'space-between' : 'center')};
  }
  .target_store_info div {
    height: 40%;
  }
  .target_store_info div p {
    font-size: 20px;
  }
  .store_search_button {
    display: flex;
    align-items: center;
  }
`;

/* 글자수 제한 함수
   initialValue => textArea 초기 문자열
   validator => textArea의 문자열을 체크할 제한 함수
*/
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const value = event?.target?.value;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const ReviewUpdatePage = ({ history }) => {
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { review } = useSelector((state) => state.review);
  const [loadingText, setLoadingText] = useState('');
  const { register, handleSubmit, setValue } = useForm();

  const reviewText = useInput(
    review ? review.review.reviewText : '',
    (value) => value.length < 1000,
  );

  const UpdateStoreReview = async (path, data) => {
    try {
      const newImages = uploadImagesToS3(
        data.storeImages.filter((image) => image.imageURL === undefined),
      );
      await updateReview(path, {
        ...data,
        reviewImages: [
          ...data.storeImages
            .filter((image) => image.imageURL)
            .map((image) => image.image),
          ...newImages,
        ],
      });
      history.push(
        `/detail?storeID=${path.storeID}&storeAddress=${data.storeAddress}`,
      );
    } catch (e) {
      if (e.response.statusCode < 500) alert('잘못된 요청입니다.');
      else alert('저장에 실패하였습니다.');
      console.error(e.response.data.message);
    }
  };

  const handleSubmitBtn = async (data) => {
    if (!loading) {
      setLoading((loading) => true);
      setLoadingText('수정중..');
      try {
        await UpdateStoreReview(
          {
            storeID: review.storeID,
            reviewID: review.review.reviewID,
          },
          { ...data, storeImages: files },
        );
      } catch (e) {
        alert(e.response.data.message);
      }
      setLoading((loading) => false);
    }
  };

  useEffect(() => {
    if (review) {
      setValue('clusterName', review.review.clusterName);
      setValue('reviewDate', review.review.reviewDate);
      setValue('storeAddress', review.storeAddress);
      setFiles(review.review.images);
    } else {
      alert('수정할 리뷰 데이터가 없습니다. 이전 페이지로 돌아갑니다.');
      history.goBack();
    }
  }, [history, review, setValue]);

  return (
    <Body>
      <Header />
      <main>
        <AntModal visible={loading} loadingText={loadingText} />
        <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
          <div className="write_page_header">
            <h1>리뷰 작성</h1>
          </div>
          <TargetStoreSearch store={true}>
            <div className="target_store_info">
              <div className="target_store_name">
                <p>{review?.storeName}</p>
              </div>
              <div className="target_store_address">
                <p>{review?.storeAddress}</p>
              </div>
            </div>
          </TargetStoreSearch>
          <div>
            리뷰(1000자 미만)
            <br />
            <textarea
              style={{ width: '100%', height: '200px' }}
              {...register('reviewText')}
              value={reviewText.value}
              maxLength={1000}
              onChange={reviewText.onChange}
              required
            />
          </div>
          <div>
            <ImageUpload
              files={files}
              count={count}
              setFiles={setFiles}
              setCount={setCount}
              setValue={setValue}
            />
          </div>
          <div className="btn-group">
            <Button name="submit" disabled={loading}></Button>
            <Button
              name="cancel"
              disabled={loading}
              onClick={() => history.push('/')}
            ></Button>
          </div>
        </StyledForm>
      </main>
    </Body>
  );
};
export default ReviewUpdatePage;
