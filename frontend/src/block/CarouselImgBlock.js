import styled from 'styled-components';
import DefaultImg from '../image/default.png';

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  margin: 0 auto;
  overflow-y: hidden;
  height: 225px;
  width: 225px;
  object-fit: cover;
  @media (max-width: 1024px) {
    height: 250px;
    width: 250px;
  }
  @media (max-width: 425px) {
    height: 250px;
    width: 330px;
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
