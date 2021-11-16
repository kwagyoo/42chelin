import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import DefalutImg from '../image/default.png';

const StoreCompactInfo = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  border-color: gray;

  .storeThumb {
    width: 100%;
    height: 200px;
  }
  .storeInfo {
    width: 100%;
    font-family: 'Do Hyeon', sans-serif;
    padding-top: 5%;
    padding-left: 5%;
    border-top: 1px solid;
    border-color: #778899;
  }
`;
// 옵셔널체이닝 store?.name -> store가 undefind 일 경우 undefind를 리턴한다
const PostBlock = ({ src, delay, store }) => {
  const [imgurl, setImgUrl] = useState('');
  useEffect(() => {
    const s3 = new AWS.S3();
    if (src) {
      s3.getSignedUrl(
        'getObject',
        {
          Bucket: '42chelin',
          Key: `img/${src}`, // ex) assets/
        },
        (err, url) => {
          if (err) {
            console.log(err);
          }
          setImgUrl(url);
        },
      );
    } else {
      setImgUrl(DefalutImg);
    }
  }, [src]);

  const fadein = useSpring({
    from: { y: '10px', opacity: 0 },
    to: { y: '0px', opacity: 1 },
    delay: delay,
    config: { duration: 2000 },
  });
  return (
    <StoreCompactInfo>
      <animated.article style={fadein}>
        <img
          className="storeThumb"
          src={imgurl}
          alt="Store Thumbnail"
          //   onError={MissingImg}
        />
        <div className="storeInfo">
          <span>{store?.storeName}</span>
          <br />
          <span>{store?.storeAddress}</span>
          <br />
          <span>리뷰 ({store?.storeReviews})</span>
        </div>
      </animated.article>
    </StoreCompactInfo>
  );
};

export default PostBlock;
