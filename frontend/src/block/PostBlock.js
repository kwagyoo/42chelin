import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

const StoreCompactInfo = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  .storeThumb {
    width: 100%;
  }
  .storeInfo {
    width: 100%;
  }
`;

const PostBlock = ({ src, delay, store }) => {
  const fadein = useSpring({
    from: { y: '10px', opacity: 0 },
    to: { y: '0px', opacity: 1 },
    delay: delay,
    config: { duration: 2000 },
  });
  return (
    <StoreCompactInfo>
      <animated.article style={fadein}>
        <img className="storeThumb" src={src.default} alt="Store Thumbnail" />
        <div className="storeInfo">
          <span>1</span>
          <br />
          <span>2</span>
        </div>
      </animated.article>
    </StoreCompactInfo>
  );
};

export default PostBlock;
