import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 15px;
  @media (max-width: 500px) {
    margin-right: 30px;
  }
`;

const Spinner = () => {
  return (
    <Flex>
      <PacmanLoader color="#6b5ce7" />;
    </Flex>
  );
};

export default Spinner;
