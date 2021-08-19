import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';

const StyledForm = styled.form`
  margin: 10px auto 0px;
  width: 600px;
  > * {
    margin-bottom: 10px;
  }
  textarea {
    vertical-align: top;
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

const PostWritePage = () => {
  const [date, setDate] = useState(null);
  const [files, setFiles] = useState([]); //업로드한 파일의 배열, 동시에 올린 파일끼리는 안에서 배열로 다시 묶여있다.
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkTextLength = (value) => {
    return value.length < 300;
  };
  const review = useInput('', checkTextLength);

  function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '-' + month + '-' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
  }

  useEffect(() => {
    const date = new Date();
    setDate(getFormatDate(date));
  }, [date]);

  return (
    <React.Fragment>
      <Header />
      <StyledForm>
        <div>
          가게명 : <input type="text" required></input>
        </div>
        <div>
          주소 : <input type="text" required></input>
        </div>
        <div>
          등록일 :
          <input
            type="date"
            placeholder="yyyy-mm-dd"
            defaultValue={date}
            disabled
          ></input>
        </div>
        <div>
          리뷰(1000자 미만)
          <br />
          <textarea
            style={{ width: '100%', height: '200px' }}
            value={review.value}
            maxLength={1000}
            //onChange={review.onChange}
            required
          />
        </div>
        <div
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          <ImageUpload
            files={files}
            count={count}
            setFiles={setFiles}
            setCount={setCount}
          />
        </div>
        <Button name="submit"></Button>
      </StyledForm>
    </React.Fragment>
  );
};
export default PostWritePage;
