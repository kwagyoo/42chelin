import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import PostBlock from '../block/PostBlock';

// 지금 상태에서 image의 map 은 undefind가 없다는 보장을 줄 수 없음
const Test = ({ images, history }) => {
  const { storeList } = useSelector((state) => state.posts);
  const onClick = (history) => {
    history.push('/detail');
  };

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
              src={image}
              delay={image.delay}
              store={storeList[index]}
            />
          </Col>
        ))}
    </Row>
  );
};

export default Test;
