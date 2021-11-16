import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarouselImg from './CarouselImg';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 1000px;
  .slick-dots {
    .slick-active {
      button::before {
        color: #000000;
      }
    }
    button::before {
      color: #708090;
    }
  }
  @media (max-width: 1900px) {
    width: 60%;
  }
  @media (max-width: 1650px) {
    width: 55%;
  }

  @media (max-width: 1500px) {
    width: 50%;
  }
  @media (max-width: 1250px) {
    width: 40%;
  }
  @media (max-width: 1070px) {
    width: 400px;
  }
  @media (max-width: 960px) {
    width: 400px;
  }
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  .slick-list {
    width: 100%;
    margin: 0 auto;
  }

  .slick-slide div {
    margin-left: 5px;
    /* cursor: pointer; */
  }

  .slick-dots {
  }

  .slick-track {
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .slick-prev,
  .slick-next {
    color: green;
  }
  .slick-prev:before,
  .slick-next:before {
    color: gray;
  }
`;

const Carousel = ({ images }) => {
  const [modifiedImages, setModifiedImages] = useState(images);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    draggable: true, //드래그 가능 여부
    responsive: [
      {
        breakpoint: 1250,
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
  useEffect(() => {
    if (images.length < 3)
      setModifiedImages([
        ...modifiedImages,
        ...Array(3 - images.length).fill('../image/default.png'),
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <Container className="carousel">
      <StyledSlider {...settings}>
        {modifiedImages
          ? modifiedImages.map((image, idx) => (
              <CarouselImg image={image} key={idx} />
            ))
          : null}
      </StyledSlider>
    </Container>
  );
};

export default Carousel;
