import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { getStoreDetailData } from '../lib/api/store';

function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => {
    images[index] = r(item);
    images[index].delay = 150 * index;
  });
  return images;
}

const SearchInput = styled.div`
  height: 100px;
  width: 650px;
  height: 50px;
  margin: 30px auto 0 auto;
  background-color: #ffffff;
  border-radius: 25px;
  border: 1.5px solid #550055;
  input {
    margin-left: 30px;
    margin-top: 5px;
    height: 40px;
    width: 550px;
    border-style: none;
  }
`;

const OptionList = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 5px;
  ul {
    float: right;
    list-style-type: none;
    width: 250px;
    height: 24px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-bottom: 0px;
  }
  ul > li {
    float: left;
    padding-left: 5px;
  }
  ul > li > button {
    border: none;
    background-color: white;
  }

  ul > li > button:active {
    color: blue;
  }
`;

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

  const testLambda = async () => {
    const testURL =
      'https://d2d5oodqrc.execute-api.ap-northeast-2.amazonaws.com/Stage/savestoredata';
    await fetch(testURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ storeName: 'yamsem', storeBranch: 'seoul' }),
    })
      .then((data) => data.json())
      .then((result) => console.log(result))
      .catch((e) => console.error(e));
  };
  const onClick = () => {
    console.log(1);
  };

  useEffect(() => {
    setImages(
      importAll(require.context('../image/', false, /.(png|jpe?g|svg)$/)),
    );
    getStoreDetailData({
      storeName: 'asdf',
      storeBranch: { city: '27', district: '200', neighborhood: '540' },
    });
  }, []);

  return (
    <React.Fragment>
      <Header />
      <SearchInput>
        <input type="text" placeholder="가게를 검색해주세요." />
      </SearchInput>
      <div className="main-body">
        <OptionList>
          <ul className="option-list-ul">
            <li>
              <button>최신순</button>
            </li>
            <li>
              <button>리뷰갯수순</button>
            </li>
            <li>
              <button>이름순</button>
            </li>
          </ul>
        </OptionList>
        <Row gutter={[16, 16]}>
          {images &&
            images.map((image, index) => (
              <Col key={index} xs={12} md={8} lg={6} xl={4} onClick={onClick}>
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
        <button onClick={testLambda}>테스트</button>
      </div>
    </React.Fragment>
  );
};

export default PostlistPage;
