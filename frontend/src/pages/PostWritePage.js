import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import addressList from '../variables/addressList';
import smile from '../image/smile.png';
import { saveStoreData } from '../lib/api/auth';

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
`;

/* 글자수 제한 함수
   initialValue => textArea 초기 문자열
   validator => textArea의 문자열을 체크할 제한 함수
*/
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
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

const PostWritePage = ({ history }) => {
  const [date, setDate] = useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const review = useInput('', value => value.length < 300);

  const handleSubmitBtn = async data => {
    if (!loading) {
      setLoading(loading => !loading);
      saveStoreData(data);
      setLoading(loading => !loading);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="write_page_header">
          <h1>리뷰 작성</h1>
        </div>
        <StyledForm onSubmit={handleSubmit(handleSubmitBtn)}>
          <div className="target_store_info"></div>
          <fieldset className="store_like_dislike">
            <input type="radio" value="5" id="level_5" name="level" />
            <label htmlFor="level_5">
              <img
                src={smile}
                className="emoji_for_like_dislike"
                style={{ width: '50px', height: '50px' }}
                alt="very good"
              />
            </label>
            <input type="radio" value="2" id="level_2" name="level" />
            <label htmlFor="level_2">
              <img
                src={smile}
                className="emoji_for_like_dislike"
                style={{ width: '50px', height: '50px' }}
                alt="very good"
              />
            </label>
          </fieldset>
          <div>
            리뷰(1000자 미만)
            <br />
            <textarea
              style={{ width: '100%', height: '200px' }}
              {...register('reviewText')}
              value={review.value}
              maxLength={1000}
              onChange={review.onChange}
              required
            />
          </div>
          <div>
            <ImageUpload
              files={files}
              count={count}
              setFiles={setFiles}
              setCount={setCount}
            />
          </div>
          <Button name="submit" disabled={loading}></Button>
          <Button
            name="cancel"
            disabled={loading}
            onClick={() => history.goBack()}
          ></Button>
        </StyledForm>
      </main>
    </React.Fragment>
  );
};
export default PostWritePage;
