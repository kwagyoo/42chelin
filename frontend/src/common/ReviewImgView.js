import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';

const ReviewImgView = ({ image }) => {
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
    <>
      <img
        src={imgurl}
        alt="reviewImg"
        style={{ width: '200px', height: '200px', paddingRight: '5%' }}
      />
    </>
  );
};

export default ReviewImgView;
