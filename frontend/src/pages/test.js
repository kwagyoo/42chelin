import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import PostBlock from '../block/PostBlock';

const Test = ({ images, history }) => {
  const storeList = useSelector((state) => state.posts);
  const onClick = (history) => {
    history.push('/detail');
  };
  console.log(storeList.storeList[0]);

  return (
    <Row gutter={[16, 16]}>
      {images &&
        storeList &&
        images.map((image, index) => (
          <Col
            key={index}
            xs={12}
            md={8}
            lg={6}
            xl={4}
            onClick={() => onClick(history)}
          >
            <PostBlock
              src={images[index]}
              delay={image.delay}
              store={storeList.storeList[index]}
            />
          </Col>
        ))}
    </Row>
  );
};

export default Test;
