import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { loadAllStoreData } from '../lib/api/store';
import { getList } from '../module/posts';
import { useDispatch, useSelector } from 'react-redux';

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
  input:focus {
    outline: none;
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

// 재사용이 가능한 코드이므로 api로 따로 빼서 관리하면 좋다.
const getAllStoreData = async ({ dispatch }) => {
  try {
    const res = await loadAllStoreData();
    const data = res.data.body;
    dispatch(getList(data));
  } catch (e) {
    console.log(e);
  }
};

// const SearchData = async () => {
//   const storeName = 'asdf';
//   try {
//     const res = await searchStoreData(storeName);
//   } catch (e) {
//     console.error(e);
//   }
// };

const PostlistPage = ({ history }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  // usememo
  //   const loadMoreImages = () => {
  //     const copyImages = images.slice(0, 4);
  //     copyImages.forEach((item, index) => {
  //       //새로 추가한 이미지에는 별도의 딜레이를 새로 추가
  //       copyImages[index].delay = 150 * index;
  //     });
  //     setImages([...images, ...copyImages]);
  //   };

  useEffect(() => {
    setImages(
      importAll(require.context('../image/', false, /.(png|jpe?g|svg)$/)),
    );
    getAllStoreData({ dispatch });
    // SearchData();
  }, [dispatch]);
  const { storeList } = useSelector((state) => state.posts);

  const onClick = (storeList) => {
    if (!storeList) return;
    history.push(
      `/detail?storeName=${storeList.storeName}&storeAddress=${storeList.storeAddress}`,
    );
  };
  // 지금 상태에서 image의 map 은 undefind가 없다는 보장을 줄 수 없음
  return (
    <>
      <Header />
      <SearchInput>
        <input type="text" placeholder="가게를 검색해주세요." />
      </SearchInput>
      <div className="main-body" style={{ width: '90%', margin: '0 auto' }}>
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
            storeList &&
            images.map((image, index) => (
              <Col
                key={index}
                xs={12}
                md={8}
                lg={6}
                xl={4}
                onClick={() => onClick(storeList[index])}
              >
                <PostBlock
                  src={image}
                  delay={image.delay}
                  store={storeList[index]}
                />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};;

export default PostlistPage;
