import styled from 'styled-components';

const StyledImg = styled.img`
  width: 200px;
  overflow-y: hidden;
  height: 200px;
  object-fit: cover;
  padding-right: 5px;
`;

const ReviewImgView = ({ image }) => {
  return (
    <>
      <StyledImg src={image} alt="reviewImg" />
    </>
  );
};

export default ReviewImgView;
