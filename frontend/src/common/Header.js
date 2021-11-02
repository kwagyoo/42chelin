import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faPencilAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const fadein = keyframes`
  0%{
    opacity : 0;
    visibility : visible;
  }
  50%{
    opacity : 0.5;
  }
  100%{
    opacity : 1;
  }
`;

const fadeout = keyframes`
  0%{
    opacity : 1;
  }
  50%{
    opacity : 0.5;
  }
  100%{
    opacity : 0;
    visibility : hidden;
  }
`;

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
  overflow : auto;
  align-items: center;

  .title {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .title:visited {
    color: #000;
  }
  
  .header-menu-item {
    height : 60px;
    display : flex;
    align-items : center;
    justify-items : center;
  }

  .header-menu-item:hover {
    background-color : gray;
  }

  .header-menu-item a{
    padding : 15px 25px;
    font-size : 15px;
    letter-spacing: 2px;
    text-decoration: none;
  }

  .header-menu-item a:visited {
    color: #000;
  }
  
  .header-menu-item:hover a{
    color : white;
  }

  .header-title{
    flex-grow : 1;
    display : flex;
    justify-content:center;
    align-items:center;
  }
  .header-menu{
    flex-grow: 10;
    display : flex;
    justify-content : flex-start;
  }
  .header-right {
    flex-grow : 1
    align-items: center;
    display: flex;
    margin-right : 25px;
  }
  .title_header_smartphone {
    display: none;
  }

  .title_header_smartphone button, .title_header_smartphone a{
    padding : 1px 6px;
    background-color : transparent;
    border : none;
    cursor : pointer;
  }

  @media screen and (max-width : 768px)
  {
    flex-direction : column;

    .title_header_smartphone{
      display : flex;
      flex-direction : row;
      justify-content : space-between;
      align-items : center;
      margin-right : 5px;
    }
    .header-title{
      margin : 5px auto;
      width : 100%;
      display : flex;
      flex-direction : row;
      justify-content : space-between;
    }
    .header-menu{
      width : 100%;
      flex-direction : column;
      align-items : center;
      overflow : auto;
      display : none;
    }
    
    .header-menu.click{
      display : flex;
    }

    .header-right{
      display : none;
    }
    .header-menu-item {
      border-top : 1px solid black;
      justify-content : center;
      margin : auto auto;
      width : 100%;
      z-index: 0;
    }
    .header-menu-item a{
      padding : 10px 20px;
      font-size : 20px;
      letter-spacing: 2px;
      text-decoration: none;
    }
  }
`;

const UserName = styled.div`
  margin-right: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
`;

const Spacer = styled.div`
  height: 50px;
  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

const Header = (props) => {
  const history = useHistory();
  const { name } = useSelector((state) => state.users);
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
              42Chelin
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
            <div className="header-menu-item">
              <Link to="/">오늘의 식당 추천</Link>
            </div>
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
