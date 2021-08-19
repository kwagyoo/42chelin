import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import 'antd/dist/antd.css';

function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => {
    images[index] = r(item);
    images[index].delay = 150 * index;
  });
  return images;
}

const PostlistPage = () => {
  const [images, setImages] = useState([]);

  const loadMoreImages = () => {
    const copyImages = images.slice(0, 4);
    copyImages.forEach((item, index) => {
      //새로 추가한 이미지에는 별도의 딜레이를 새로 추가
      copyImages[index].delay = 150 * index;
    });
    setImages([...images, ...copyImages]);
  };

  useEffect(() => {
    setImages(
      importAll(require.context('../image/', false, /.(png|jpe?g|svg)$/)),
    );
  }, []);

  return (
    <React.Fragment>
      <Header/>
      <Row>
        {images &&
          images.map((image, index) => (
            <Col key={index} xs={24} md={8} lg={6}>
              <PostBlock src={images[index]} delay={image.delay} />
            </Col>
          ))}
      </Row>
      <button
        onClick={loadMoreImages}
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        로딩하기
      </button>
    </React.Fragment>
  );
};

export default PostlistPage;
