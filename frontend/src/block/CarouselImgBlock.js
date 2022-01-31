import styled from 'styled-components';
import DefaultImg from '../image/default.png';

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  margin: 0 auto;
  overflow-y: hidden;
  height: 250px;
  width: 250px;
  object-fit: cover;
  @media (max-width: 1440px) {
    height: 250px;
    width: 250px;
  }
  @media (max-width: 1024px) {
    height: 250px;
    width: 250px;
  }
  @media (max-width: 425px) {
    height: 250px;
    width: 250px;
  }
  @media (max-width: 320px) {
    height: 230px;
    width: 200px;
  }
`;

const CarouselImg = ({ image }) => {
  return (
    <CardBox>
      {image.imageURL ? (
        <CardImg src={image.imageURL} alt="tmp" />
      ) : (
        <CardImg src={DefaultImg} alt="default" />
      )}
    </CardBox>
  );
};

export default CarouselImg;
