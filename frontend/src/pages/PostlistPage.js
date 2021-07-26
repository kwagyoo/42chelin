import React from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';

function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images[index] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('../image/', false, /\.(png|jpe?g|svg)$/),
);

const PostlistPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6}>
          {images.map((image, index) => (
            <PostBlock key={index} src={images[index]} />
          ))}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PostlistPage;
