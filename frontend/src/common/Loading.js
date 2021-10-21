import styled from 'styled-components';
import Spinner from './Spinner';

const Title = styled.h1`
  font-size: 64px;
  font-weight: bold;
  margin: 8px;
  margin-bottom: 96px;
  text-align: center;
`;

const Loading = () => {
  return (
    <>
      <Title>로그인 중 ..</Title>
      <Spinner></Spinner>
    </>
  );
};

export default Loading;
