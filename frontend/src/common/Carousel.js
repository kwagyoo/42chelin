import styled from 'styled-components';
import CarouselImgBlock from '../block/CarouselImgBlock';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';

const Container = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
  width: 50%;
  .slick-dots {
    margin: 0 10%;
    li button {
      height: 7px;
      border: 1px solid black;
    }
    .slick-active {
      button::before {
        color: #000000;
      }
    }
    button::before {
      color: #708090;
    }
  }
  @media (max-width: 1023px) {
    flex-basis: 30%;
  }
  @media (max-width: 728px) {
    flex-basis: 25%;
    width: 100%;
    margin-bottom: 10px;
  }
  @media (max-width: 425px) {
    width: 100%;
    flex-basis: 30%;
    padding-left: 10px;
  }
`;

const CarouselWrapper = ({ images }) => {
  const [modifiedImages, setModifiedImages] = useState(images);
  useEffect(() => {
    if (modifiedImages && modifiedImages.length < 4)
      setModifiedImages([
        ...modifiedImages,
        ...Array(4 - images.length).fill('../image/default.png'),
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const settings = {
    slidesToShow: 4,
    autoplay: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 728,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container className="carousel">
      <Carousel {...settings}>
        {modifiedImages
          ? modifiedImages.map((image, idx) => (
              <CarouselImgBlock image={image} key={idx} />
            ))
          : null}
      </Carousel>
    </Container>
  );
};

export default CarouselWrapper;
