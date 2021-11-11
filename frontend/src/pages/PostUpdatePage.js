import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import { updateStoreReview } from '../lib/api/store';
import { uploadImagesToS3 } from '../lib/api/aws';
import { useSelector } from 'react-redux';

const StyledForm = styled.form`
  margin: 10px auto 0px;
  width: 600px;
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

const PostWritePage = ({ history, location }) => {
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { review } = useSelector((state) => state.review);

  const { register, handleSubmit, setValue } = useForm();

  const reviewText = useInput(
    review ? review.review.reviewText : '',
    (value) => value.length < 1000,
  );

  const UpdateStoreReview = async (data) => {
    const userToken = localStorage.getItem('token');
    if (!userToken) return null;
    try {
      const newImages = uploadImagesToS3(
        data.images.filter((image) => image.imageURL === undefined),
      );
      console.log([
        ...newImages,
        ...data.images.filter((image) => image.imageURL),
      ]);
      // await updateStoreReview({
      //   ...data,
      //   token: userToken,
      //   images: [
      //     ...newImages,
      //     ...data.images.filter((image) => typeof image === 'string'),
      //   ],
      // });
      setTimeout(() => {
        history.push(
          `/detail?storeName=${data.storeName}&storeAddress=${data.storeAddress}`,
        );
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitBtn = async (data) => {
    if (!loading) {
      setLoading((loading) => true);
      await UpdateStoreReview({ ...data, images: files });
      setLoading((loading) => false);
    }
  };

  useEffect(() => {
    if (review) {
      setValue('userName', review.userName);
      setValue('reviewDate', review.review.reviewDate);
      setValue('storeName', review.storeName);
      setValue('storeAddress', review.storeAddress);
      review.review.images?.forEach((image) => {
        setFiles([...files, image]);
      });
    } else {
      alert('수정할 리뷰 데이터가 없습니다. 이전 페이지로 돌아갑니다.');
      history.goBack();
    }
  }, [review, setValue]);

  return (
    <React.Fragment>
      <Header />
      <main>
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
          <Button name="submit" disabled={loading}></Button>
          <Button
            name="cancel"
            disabled={loading}
            onClick={() => history.push('/')}
          ></Button>
        </StyledForm>
      </main>
    </React.Fragment>
  );
};
export default PostWritePage;
