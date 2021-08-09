import React from 'react';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledForm = styled.form`
  > * {
    margin-bottom: 10px;
  }
`;

const PostWritePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <React.Fragment>
      <Header />
      <StyledForm>
        <div>
          이름 : <input type="text"></input>
        </div>
        <div>
          주소 : <input type="text"></input>
        </div>
        <div>
          등록일 : <input type="date"></input>
        </div>
        <div>
          리뷰
          <br />{' '}
          <input type="textarea" style={{ width: '80%', height: '200px' }} />
        </div>
        <Button name="submit"></Button>
      </StyledForm>
    </React.Fragment>
  );
};
export default PostWritePage;
