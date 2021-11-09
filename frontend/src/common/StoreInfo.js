import styled from 'styled-components';
import DefalutImg from '../image/defalut.png';

const StyledInfo = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #bcbcbc;
  padding: 0 20px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  padding: 10px;
`;

const StyledContent = styled.div`
  padding-top: 20px;
`;

const StoreInfo = ({ onClick, address, placeName, categoryName }) => {
  return (
    <StyledInfo onClick={onClick}>
      <div>
        <StyledImg src={DefalutImg} alt="tmp" />
      </div>
      <StyledContent>
        <h2>{placeName}</h2>
        <div>
          <div>{placeName}</div>
          <div>{address}</div>
          <div>{categoryName}</div>
        </div>
      </StyledContent>
    </StyledInfo>
  );
};

export default StoreInfo;
