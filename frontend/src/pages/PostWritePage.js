import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';

const StyledForm = styled.form`
  margin-left: 10px;
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
    const {
      target: { value },
    } = event;
    //const value = event.target.value 와 같음
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

  const checkLen = (value) => {
    return value.length < 300;
  };
  const review = useInput('', checkLen);

  function getFormatDate(date) {
    var year = date.getFullYear(); //yyyy
    var month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    var day = date.getDate(); //d
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
          이름 : <input type="text" required></input>
        </div>
        <div>
          주소 : <input type="text" required></input>
        </div>
        <div>
          등록일 :{' '}
          <input
            type="date"
            placeholder="yyyy-mm-dd"
            defaultValue={date}
            disabled
          ></input>
        </div>
        <div>
          리뷰
          <br />
          <textarea
            style={{ width: '80%', height: '200px' }}
            value={review.value}
            onChange={review.onChange}
            required
          />
        </div>
        <ImageUpload
          files={files}
          count={count}
          setFiles={setFiles}
          setCount={setCount}
        />
        <Button name="submit"></Button>
      </StyledForm>
    </React.Fragment>
  );
};
export default PostWritePage;
