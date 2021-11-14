import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import styled from 'styled-components';

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 100%;
  overflow-y: hidden;

  height: 200px;
`;
const CarouselImg = ({ image }) => {
  const [imgurl, setImgUrl] = useState('');

  useEffect(() => {
    const s3 = new AWS.S3();
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
  }, [image]);

  return (
    <CardBox>
      <CardImg src={imgurl} alt="tmp" />
    </CardBox>
  );
};

export default CarouselImg;
