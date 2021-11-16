import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarouselImg from './CarouselImg';

const Container = styled.div`
  width: 700px;
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
  @media (max-width: 1500px) {
    width: 550px;
  }
  @media (max-width: 1250px) {
    width: 50%;
  }
  @media (max-width: 1070px) {
    width: 45%;
  }

  @media (max-width: 1000px) {
    width: 40%;
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
    color: #2f4f4f;
  }
`;
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
  centerPadding: '0px',
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

const Carousel = ({ images }) => {
  return (
    <Container className="carousel">
      <StyledSlider {...settings}>
        {images.map((image, idx) => (
          <CarouselImg image={image} key={idx} />
        ))}
      </StyledSlider>
    </Container>
  );
};

export default Carousel;
