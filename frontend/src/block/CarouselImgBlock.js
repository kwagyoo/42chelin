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
