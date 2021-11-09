import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { searchStoreData } from '../lib/api/store';
import qs from 'qs';

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
      const res = await searchStoreData(query.storeName);
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
      `/detail?storeName=${storeList.storeName}&storeAddress=${storeList.storeAddress}`,
    );
  };

  // 지금 상태에서 image의 map 은 undefind가 없다는 보장을 줄 수 없음
  return (
    <>
      <Header />
      <SearchInput onKeyPress={onKeyPress}>
        <input
          type="text"
          placeholder="가게를 검색해주세요."
          onChange={onChange}
          value={text}
        />
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
          {searchstoreList &&
            searchstoreList.map((store, index) => (
              <Col
                key={index}
                xs={12}
                md={8}
                lg={6}
                xl={4}
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
      </div>
    </>
  );
};

export default SearchPage;
