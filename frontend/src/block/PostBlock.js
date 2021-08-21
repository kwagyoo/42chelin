import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

const StoreCompactInfo = styled.div`
  border: 2px solid black;
  border-radius: 5px;
`;

const PostBlock = ({ src, delay }) => {
  const fadein = useSpring({
    from: { y: '10px', opacity: 0 },
    to: { y: '0px', opacity: 1 },
    delay: delay,
    config: { duration: 2000 },
  });
  return (
    <StoreCompactInfo>
      <animated.div style={fadein}>
        <img src={src.default} alt="pokemon" />
        <br />
        <span>이름 : 펄기아</span>
        <br />
        <span>출현 : 관동</span>
        <br />
        <span>타입 : 불꽃</span>
      </animated.div>
    </StoreCompactInfo>
  );
};

export default PostBlock;
