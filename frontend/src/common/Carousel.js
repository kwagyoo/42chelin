import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarouselImg from './CarouselImg';

const Container = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  .slick-dots {
    .slick-active {
      button::before {
        color: #000000;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 500px;
    height: 200px;
    margin: 0 auto;
  }

  .slick-slide div {
    /* cursor: pointer; */
  }

  .slick-dots {
    bottom: -50px;
    margin-top: -200px;
  }

  .slick-track {
    overflow-x: hidden;
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0px',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Carousel = ({ images }) => {
  return (
    <Container>
      <StyledSlider {...settings}>
        {images.map((image, idx) => (
          <CarouselImg image={image} key={idx} />
        ))}
      </StyledSlider>
    </Container>
  );
};

export default Carousel;
