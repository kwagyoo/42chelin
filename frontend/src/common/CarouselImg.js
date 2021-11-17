import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import DefaultImg from '../image/default.png';

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 100%;
  overflow-y: hidden;
  height: 200px;
  object-fit: cover;
`;

const CarouselImg = ({ image }) => {
  const [imgurl, setImgUrl] = useState(null);
  useEffect(() => {
    const s3 = new AWS.S3();
    if (!image.includes('../')) {
      s3.getSignedUrl(
        'getObject',
        {
          Bucket: '42chelin',
          Key: `img/${image}`, // ex) assets/
        },
        (err, url) => {
          if (err) {
            throw err;
          }
          setImgUrl(url);
        },
      );
    }
  }, [image]);

  return (
    <CardBox>
      {imgurl ? (
        <CardImg src={imgurl} alt="tmp" />
      ) : (
        <CardImg src={DefaultImg} alt="default" />
      )}
    </CardBox>
  );
};

export default CarouselImg;
