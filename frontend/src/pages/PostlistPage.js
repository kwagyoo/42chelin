import React from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import 'antd/dist/antd.css';

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
const style = { background: '#0092ff', padding: '8px 0' };

const PostlistPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Row>
        {images.map((image, index) => (
          <Col xs={24} md={8} lg={6}>
            <PostBlock key={index} src={images[index]} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default PostlistPage;
