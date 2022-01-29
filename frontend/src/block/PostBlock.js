import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import DefalutImg from '../image/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { loadThumbnailFromS3 } from '../lib/api/aws';

const StoreCompactInfo = styled.div`
  cursor: pointer;
  article {
    border: 1px solid black;
    border-radius: 5px;
    border-color: #dbdbdb;
    background-color: white;
  }
  .store-thumb {
    width: 100%;
    height: 200px;
  }
  .store-info {
    width: 100%;
    padding: 5%;
    /* border-top: 1px solid;
    border-color: #778899; */
    h2 {
      width: 100%;
      margin-bottom: 0;
    }
    .store-address {
      color: gray;
      white-space: nowrap;
      overflow: hidden;
    }
    .store-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .store-count {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    padding-top: 5%;
  }
`;

// 옵셔널체이닝 store?.name -> store가 undefind 일 경우 undefind를 리턴한다
const PostBlock = ({ src, delay, store }) => {
  const [imgurl, setImgUrl] = useState('');

  const loadThumbnail = async (src) => {
    try {
      const url = await loadThumbnailFromS3([src]);
      setImgUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (src) {
      loadThumbnail(src);
    } else {
      setImgUrl(DefalutImg);
    }
  }, [src]);

  const fadein = useSpring({
    from: { y: '5px', opacity: 0 },
    to: { y: '0px', opacity: 1 },
    delay: delay,
    config: { duration: 500 },
  });
  return (
    <StoreCompactInfo>
      <animated.article style={fadein}>
        <div className="store-info">
          <div className="store-name">
            <h2>{store?.storeName}</h2>
          </div>
          <div className="store-address">{store?.storeAddress}</div>
          <br />
          <img
            className="store-thumb"
            src={imgurl}
            alt="Store Thumbnail"
            //   onError={MissingImg}
          />
          <div className="store-count">
            <span>
              <FontAwesomeIcon
                icon={fasFaHeart}
                size="lg"
                color="#8E8E8E"
                style={{ margin: '0 5px' }}
              />
              {store.storeLikes}
            </span>
            <span>리뷰 {store?.storeReviews}</span>
          </div>
        </div>
      </animated.article>
    </StoreCompactInfo>
  );
};

export default PostBlock;
