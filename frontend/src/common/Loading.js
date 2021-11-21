import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Title = styled.h1`
  font-size: 64px;
  font-weight: bold;
  margin: 8px;
  margin-bottom: 96px;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 40px;
    margin-bottom: 60px;
  }
`;

const Loading = ({ loadingText }) => {
  return (
    <Container>
      <Title>{loadingText ? loadingText : '로딩중..'}</Title>
      <Spinner></Spinner>
    </Container>
  );
};

export default Loading;
