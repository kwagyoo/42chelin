import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { loadAllStoreData, searchStoreData } from '../lib/api/store';

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

const getAllStoreData = async () => {
  try {
    const res = await loadAllStoreData();
    console.log(res.data.body[0]);
  } catch (e) {
    console.log(e);
  }
};

const SearchData = async () => {
  const storeName = 'asdf';
  try {
    const res = await searchStoreData(storeName);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

const PostlistPage = ({ history }) => {
  const [images, setImages] = useState([]);

  const loadMoreImages = () => {
    const copyImages = images.slice(0, 4);
    copyImages.forEach((item, index) => {
      //새로 추가한 이미지에는 별도의 딜레이를 새로 추가
      copyImages[index].delay = 150 * index;
    });
    setImages([...images, ...copyImages]);
  };

  const onClick = (history) => {
    history.push('/detail');
  };

  useEffect(() => {
    setImages(
      importAll(require.context('../image/', false, /.(png|jpe?g|svg)$/)),
    );
    getAllStoreData();
    SearchData();
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
              <Col
                key={index}
                xs={12}
                md={8}
                lg={6}
                xl={4}
                onClick={() => onClick(history)}
              >
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
      </div>
    </React.Fragment>
  );
};

export default PostlistPage;
