import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faPencilAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../image/Logo.png';

const HeaderBlock = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: auto;
  z-index: 999;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  align-items: center;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 20px;
  font-style: bold;
  .title {
    padding-left: 10px;
    letter-spacing: 2px;
    img {
      width: 150px;
      height: 60px;
      padding-left: 10px;
    }
  }
  .title:visited {
    color: #000;
  }

  .header-random-button {
    border: none;
    background-color: white;
    /* color: black; */
  }
  .header-random-button a {
    color: #000000d9;
    :hover {
      color: gray;
      cursor: pointer;
    }
  }

  .header-menu-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
  }

  .header-menu-item:hover {
    color: gray;
    cursor: pointer;
  }

  .header-menu-item a {
    color: #000000d9;

    padding: 15px 25px;
    letter-spacing: 2px;
  }

  .header-menu-item a:visited {
    color: #000000d9;
  }

  .header-menu-item:hover a {
    color: gray;
  }

  .header-title {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-menu {
    flex-grow: 10;
    display: flex;
    justify-content: flex-start;
  }
  .header-right {
    flex-grow: 1;
    align-items: center;
    display: flex;
    margin-right: 25px;
  }
  .title_header_smartphone {
    display: none;
  }

  .title_header_smartphone button,
  .title_header_smartphone a {
    padding: 1px 6px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    .title_header_smartphone {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;
    }
    .header-title {
      margin: 5px auto;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .header-menu {
      width: 100%;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      display: none;
    }

    .header-menu.click {
      display: flex;
    }

    .header-right {
      display: none;
    }
    .header-menu-item {
      border-top: 1px solid black;
      justify-content: center;
      margin: auto auto;
      width: 100%;
      z-index: 0;
    }
    .header-menu-item a {
      padding: 10px 20px;
      font-size: 20px;
      letter-spacing: 2px;
      text-decoration: none;
    }
  }
`;

const UserName = styled.div`
  height: 40px;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: 400;
`;

const Spacer = styled.div`
  height: 50px;
  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

const Header = () => {
  const name = localStorage.getItem('username');
  const [isLogin, setisLogin] = useState('');
  const [isMenuClick, setIsMenuClick] = useState(false);

  useEffect(() => {
    if (!isLogin) setisLogin(localStorage.getItem('token'));
  }, [isLogin]);
  const URL = `${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIECT_URL}&response_type=code`;

  const onLogout = () => {
    if (isLogin) {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setisLogin('');
      alert('로그아웃 되었습니다.');
    }
  };
  return (
    <React.Fragment>
      <HeaderBlock>
        <Wrapper>
          <div className="header-title">
            <Link to="/" className="title">
              <img src={logo} alt="title" />
            </Link>
            <div className="title_header_smartphone">
              {isLogin ? (
                <>
                  <UserName>{name}</UserName>
                  <Link to="write">
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{ color: 'black', width: '30px', height: '30px' }}
                      size="lg"
                      className="search"
                    />
                  </Link>
                  <button onClick={onLogout}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ color: 'black', width: '30px', height: '30px' }}
                      size="lg"
                      className="search"
                    />
                  </button>
                </>
              ) : (
                <a href={URL}>
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ color: 'black', width: '30px', height: '30px' }}
                    size="lg"
                    className="search"
                  />
                </a>
              )}
              <button onClick={() => setIsMenuClick(!isMenuClick)}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ color: 'black', width: '30px', height: '30px' }}
                  size="lg"
                  className="search"
                />
              </button>
            </div>
          </div>
          <div className={isMenuClick ? 'header-menu click' : 'header-menu'}>
            <div className="header-menu-item">
              <Link to="/">식당 리뷰</Link>
            </div>
            <button className="header-random-button">
              <Link to="/random">오늘 뭐먹지?</Link>
            </button>
          </div>
          <div className="header-right">
            {isLogin ? (
              <>
                <UserName>
                  <p>{name}</p>
                </UserName>
                <Button name="리뷰 작성" to="/write" />
                <Button name="로그아웃" onClick={onLogout} />
              </>
            ) : (
              <Button
                name="로그인"
                onClick={() => window.location.replace(URL)}
              />
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </React.Fragment>
  );
};

export default Header;
