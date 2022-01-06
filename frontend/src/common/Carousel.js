import styled from 'styled-components';
import CarouselImgBlock from '../block/CarouselImgBlock';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';

const Container = styled.div`
  width: 500px;
  flex-grow: 1;
  flex-shrink: 1;
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
  @media (max-width: 1350px) {
    flex-basis: 40%;
  }
  @media (max-width: 960px) {
    flex-basis: 25%;
  }
`;

//   @media (max-width: 1900px) {
//     width: 60%;
//   }
//   @media (max-width: 1650px) {
//     width: 55%;
//   }

//   @media (max-width: 1500px) {
//     width: 50%;
//   }
//   @media (max-width: 1250px) {
//     width: 40%;
//   }
//   @media (max-width: 1070px) {
//     width: 400px;
//   }
//   @media (max-width: 960px) {
//     width: 350px;
//   }
//   @media (max-width: 400px) {
//     width: 300px;
//   }

const CarouselWrapper = ({ images }) => {
  const [modifiedImages, setModifiedImages] = useState(images);
  useEffect(() => {
    if (modifiedImages && modifiedImages.length < 3)
      setModifiedImages([
        ...modifiedImages,
        ...Array(3 - images.length).fill('../image/default.png'),
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const settings = {
    slidesToShow: 3,
    autoplay: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
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
