import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { loadAllStoreData } from '../lib/api/store';
import { getList } from '../module/posts';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import StoreMap from '../common/StoreMap';

const SearchInput = styled.div`
  width: 90%;
  height: 50px;
  margin: 30px auto 0 auto;
  background-color: #ffffff;
  border-radius: 25px;
  border: 1.5px solid #550055;
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
    font-family: 'Do Hyeon', sans-serif;
  }
`;

const OptionList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  ul {
    float: right;
    list-style-type: none;
    width: 180px;
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

const MainBody = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: 'Do Hyeon', sans-serif;
`;

const ToggleButton = styled.div`
  margin-left: 10px;
  margin-bottom: 5px;
  .btn-check {
    width: 0;
    height: 0;
    margin-right: 10px;
  }
  .btn-group label:hover {
    cursor: pointer;
    color: #2f4f4f;
  }
  .btn-group {
    width: 85px;
    height: 30px;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: normal;
    align-items: center;
    border-radius: 5px;
    background-color: #ffffff;
    color: #6c757d;
    overflow-x: hidden;
  }
  .btn-div {
    display: flex;
    flex-grow: 1;
    width: 42px;
    height: 100%;
    align-items: center;
    border: 1px solid;
  }

  .btn-div:first-child {
    border-radius: 5px 0 0 5px;
  }
  .btn-div:last-child {
    border-radius: 0 5px 5px 0;
  }
  .btn-div.clicked {
    background-color: #696969;
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

const PostlistPage = ({ history }) => {
  const [text, setText] = useState('');
  const [change, setChange] = useState(true);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const ChangeList = (e) => {
    if (e.target.id === 'btnradio1') setChange(true);
    else setChange(false);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/search',
        search: `?storeName=${text}`,
      });
    }
  };

  useEffect(() => {
    getAllStoreData({ dispatch });
  }, [dispatch]);
  const { storeList } = useSelector((state) => state.posts);
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
      <MainBody className="main-body">
        <OptionList>
          <div>전체 가게 개수 : {storeList.length}</div>
          <ul className="option-list-ul">
            <li>
              <button>리뷰갯수순</button>
            </li>
            <li>
              <button>이름순</button>
            </li>
          </ul>
        </OptionList>
        <ToggleButton className="list-mode">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <div className={'btn-div ' + (change ? 'clicked' : '')}>
              <input
                type="radio"
                className="btn-check"
                id="btnradio1"
                name="btn-check"
                onClick={ChangeList}
              />
              <label htmlFor="btnradio1">
                <FontAwesomeIcon
                  icon={faThLarge}
                  size="lg"
                  color={change ? '#ffffff' : '#696969'}
                />
              </label>
            </div>
            <div className={'btn-div ' + (change ? '' : 'clicked')}>
              <input
                type="radio"
                className={'btn-check ' + (change ? '' : 'clicked')}
                id="btnradio2"
                name="btn-check"
                onClick={ChangeList}
              />
              <label htmlFor="btnradio2">
                <FontAwesomeIcon
                  icon={faMap}
                  size="lg"
                  color={change ? '#696969' : '#ffffff'}
                />
              </label>
            </div>
          </div>
        </ToggleButton>
        {change === true ? (
          <Row gutter={[16, 16]}>
            {storeList &&
              storeList.map((store, index) => (
                <Col
                  key={index}
                  xs={24}
                  md={12}
                  lg={8}
                  xl={6}
                  onClick={() => goDetail(storeList[index])}
                >
                  <PostBlock
                    src={store.storeImage}
                    delay={store.delay}
                    store={storeList[index]}
                  />
                </Col>
              ))}
          </Row>
        ) : (
          <StoreMap storeList={storeList} history={history} />
        )}
      </MainBody>
    </>
  );
};

export default PostlistPage;
