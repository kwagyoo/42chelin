import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import { searchStore } from '../lib/api/store';
import qs from 'qs';

const ListBody = styled.div`
  background-color: #fafafa;
  height: 100vh;
  min-height: 100vh;
`;

const SearchInput = styled.div`
  width: 80%;
  height: 50px;
  margin: 30px auto 30px auto;
  background-color: #ffffff;
  border-radius: 25px;
  border: 1.5px solid #550055;
  margin-bottom: 5px;

  input {
    margin-left: 30px;
    margin-top: 5px;
    height: 70%;
    width: 70%;
    border-style: none;
  }
  input:focus {
    outline: none;
  }
  input::placeholder {
  }
`;
const MainBody = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const SearchPage = ({ history, location }) => {
  const [text, setText] = useState('');
  const [searchstoreList, setSearchstoreList] = useState([]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/search',
        search: `?storeName=${text}`,
      });
    }
  };

  const SearchData = async (query) => {
    try {
      const res = await searchStore(query.storeName);
      setSearchstoreList(res.data.body);
    } catch (e) {
      console.error(e);
      alert('가게 정보를 불러올 수 없습니다.');
    }
  };

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    SearchData(query);
    return () => {
      setSearchstoreList('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const goDetail = (storeList) => {
    if (!storeList) return;
    history.push(
      `/detail?storeID=${storeList.storeID}&storeAddress=${storeList.storeAddress}`,
    );
  };

  // 지금 상태에서 image의 map 은 undefind가 없다는 보장을 줄 수 없음
  return (
    <ListBody>
      <Header />
      <SearchInput onKeyPress={onKeyPress}>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
      </SearchInput>
      <MainBody>
        <Row gutter={[16, 16]}>
          {searchstoreList &&
            searchstoreList.map((store, index) => (
              <Col
                key={index}
                xs={24}
                md={12}
                lg={8}
                xl={6}
                onClick={() => goDetail(searchstoreList[index])}
              >
                <PostBlock
                  src={store.storeImage}
                  delay={store.delay}
                  store={searchstoreList[index]}
                />
              </Col>
            ))}
        </Row>
      </MainBody>
    </ListBody>
  );
};

export default SearchPage;
