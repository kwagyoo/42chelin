import PacmanLoader from 'react-spinners/PacmanLoader';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
  return (
    <Flex>
      <PacmanLoader color="#6b5ce7" />;
    </Flex>
  );
};

export default Spinner;
