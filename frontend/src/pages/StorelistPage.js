import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import PostBlock from '../block/PostBlock';
import 'antd/dist/antd.css';
import { searchStore } from '../lib/api/store';
import { getList } from '../module/posts';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import StoreMap from '../common/StoreMap';
import Header from '../common/Header';
import SkeletonDiv from '../common/Skeleton';

const ListBody = styled.div`
  background-color: #fafafa;
  input[type='radio'] {
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  height: 100%;
  padding-bottom: 10px;
`;

const SearchInput = styled.div`
  width: 80%;
  height: 50px;
  margin: 30px auto 0 auto;
  background-color: #ffffff;
  border-radius: 25px;
  border: 1.5px solid gray;
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
  min-height: 100vh;
  margin: 0 auto;
  .sort-opt {
    display: flex;
    ul {
      float: right;
      list-style-type: none;
      width: 100%;
      height: 30px;
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
      background-color: #fafafa;
    }

    ul > li > button:active {
      color: blue;
    }
  }
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
    -webkit-border-radius: 0;
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

const StorelistPage = ({ history }) => {
  const [text, setText] = useState('');
  const [change, setChange] = useState(true);
  const [stores, setStores] = useState([]);
  const [lastEval, setLastEval] = useState(undefined);
  const [endScroll, setEndScroll] = useState(true);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const ChangeList = useCallback((e) => {
    if (e.target.id === 'btnradio1') setChange(true);
    else setChange(false);
  }, []);
  const onKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        history.push({
          pathname: '/search',
          search: `?storeName=${text}`,
        });
      }
    },
    [history, text],
  );
  /* 인터섹션 callback */
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      setEndScroll(true);
    }
  };

  useEffect(() => {
    const apiTest = async () => {
      if (stores.length > 0 && !lastEval) {
        setEndScroll(false);
        return;
      }
      const res = await searchStore({ lastEvaluatedKey: lastEval });
      const data = res.data.body;
      setStores((prev) => [...prev, ...data]);
      setLastEval(res.data.LastEvaluatedKey);
      dispatch(getList(data));
      setEndScroll(false);
    };
    if (endScroll) apiTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endScroll]);

  useEffect(() => {
    if (stores.length > 0 && !lastEval) return;
    if (stores.length > 0) {
      let observer;
      if (scrollRef) {
        observer = new IntersectionObserver(onIntersect, {
          threshold: 0.5,
        });
        observer.observe(scrollRef.current);
      }
      return () => observer && observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [stores, lastEval]);

  const goDetail = (stores) => {
    if (!stores) return;
    history.push(
      `/detail?storeID=${stores.storeID}&storeAddress=${stores.storeAddress}`,
    );
  };
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
        <div className="sort-opt">
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
        </div>
        {change === true ? (
          <>
            <Row gutter={[16, 16]}>
              {stores &&
                stores.map((store, index) => (
                  <Col
                    key={index}
                    xs={24}
                    md={12}
                    lg={8}
                    xl={4}
                    onClick={() => goDetail(stores[index])}
                  >
                    <PostBlock
                      src={store.storeImage}
                      delay={store.delay}
                      store={stores[index]}
                    />
                  </Col>
                ))}
            </Row>
            <div className="infinite-scroll-area" ref={scrollRef}>
              {endScroll ? <SkeletonDiv /> : ''}
            </div>
          </>
        ) : (
          <StoreMap history={history} />
        )}
      </MainBody>
    </ListBody>
  );
};

export default StorelistPage;
