/* eslint-disable jsx-a11y/heading-has-content */
import { useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Header from '../common/Header';
import { fetchRandomStore } from '../lib/api/store';

const MainBody = styled.div`
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`;
const Container = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ul,
  ol {
    list-style: none;
  }
  .randomBox {
    height: 400px;
  }
  @media (max-width: 425px) {
    h2 {
      font-size: 1em;
      height: 100%;
    }
    // Todo: 크기가 커지면 자동으로 밀려나게 하고 싶었는데 안되서 일단 overflow hidden으로 처리함
    .menu_btn {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .menu_print {
        overflow: hidden;
      }
    }
  }

  .slot_container {
    height: 100px;
    overflow: hidden;
    display: flex;
    align-items: start;
    justify-content: center;
  }
  .title {
    h1 {
      font-size: 3rem;
    }
    h3 {
      font-size: 2rem;
      color: gray;
    }
    @media (max-width: 425px) {
      h1 {
        font-size: 2em;
      }
      h3 {
        font-size: 1.17em;
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @keyframes slide {
    0% {
      margin-top: 0;
    }
    10% {
      margin-top: -40px;
    }
    20% {
      margin-top: -80px;
    }
    30% {
      margin-top: -120px;
    }
    40% {
      margin-top: -160px;
    }
    50% {
      margin-top: -200px;
    }
    60% {
      margin-top: -240px;
    }
    70% {
      margin-top: -280px;
    }
    80% {
      margin-top: -320px;
    }
    90% {
      margin-top: -360px;
    }
    100% {
      margin-top: -400px;
    }
  }

  .slide_box {
    width: 300px;
    height: 500px;
    animation: slide 1s infinite linear;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 20%;
  }
  .slide_box li {
    height: 50px;
    font-size: 2em;
    font-weight: bold;
  }
  .menu_print {
    height: 60px;
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 40px;
    color: black;
    transition: 0.5s;
  }
  .btn_area {
    height: 70px;
    display: flex;
    justify-content: center;
    bottom: -60px;
    margin-top: 30px;
  }
  button {
    background: black;
    color: #fff;
    border: none;
    position: relative;
    height: 40px;
    font-size: 1.4em;
    padding: 0 1em;
    cursor: pointer;
    transition: 800ms ease all;
    outline: none;
  }
  button:hover {
    background: #fff;
    color: black;
  }
  button:before,
  button:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: black;
    transition: 400ms ease all;
  }
  button:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  button:hover:before,
  button:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
  .btn-go {
    display: none;
  }
`;

const RandomStore = () => {
  const displaySlot = useRef();
  const store_print = useRef();
  const btnGo = useRef();
  const [resetNum, setResetNum] = useState(0);
  const [store, setStore] = useState({
    storeName: '',
    storeAddress: '',
  });
  const history = useHistory();
  const SampleStore = [
    '연스시',
    '스파게티 스토리',
    '농민백암순대',
    '모스버거',
    '노브랜드버거',
    '서브웨이',
    '리에',
    '백년교동짬뽕',
    '부산어묵',
    '이삭토스트',
  ];

  const reset = () => {
    displaySlot.current.style.display = 'block';
    btnGo.current.style.display = 'none';
    store_print.current.style.display = 'none';
    setResetNum(0);
  };

  const getStore = async () => {
    try {
      const res = await fetchRandomStore();
      displaySlot.current.style.display = 'none';
      btnGo.current.style.display = 'block';
      setStore(res.data.body);
      if (resetNum === 0) store_print.current.style.display = 'block';
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const GoStore = () => {
    history.push(
      `/detail?storeName=${store.storeName}&storeAddress=${store.storeAddress}`,
    );
  };

  return (
    <MainBody>
      <Header />
      <Container>
        <div className="randomBox">
          <div className="title">
            <h1>오늘 뭐먹지?</h1>
            <h3>오늘의 픽</h3>
          </div>
          <div className="menu_btn">
            <div className="menu_print" ref={store_print}>
              <h2>{store.storeName}</h2>
            </div>
            <div className="menu_slot" ref={displaySlot}>
              <div className="slot_container">
                <ul className="slide_box">
                  {SampleStore.map((store, idx) => (
                    <li key={idx}>{store}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="btn_area">
              <button onClick={getStore}>Pick menu</button>
              <button className="btn-go" ref={btnGo} onClick={GoStore}>
                Go
              </button>
              <button onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </Container>
    </MainBody>
  );
};

export default RandomStore;
