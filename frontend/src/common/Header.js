import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
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
  align-items: center;
  
  div{
    height : 60px;
  }

  .title {
    margin : auto 0;
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
    margin : auto 25px auto 5px;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .header-menu-item:visited {
    color: #000;
  }
  .header_title{
    flex-grow : 1
  }
  .header_menu{
    flex-grow: 10;
    display : flex;
    justify-content : flex-start;
  }
  .header_right {
    flex-grow : 1
    align-items: center;
    display: flex;
  }
  .title_header_smartphone {
    display: none;
  }

  @media screen and (max-width : 768px)
  {
    flex-direction : column;

    .title_header_smartphone{
      display : flex;
      flex-direction : row;
      justify-content : space-between;
      margin-right : 2rem;
    }
    .header_title{
      width : 100%;
      display : flex;
      flex-direction : row;
      justify-content : space-between;
    }
    .header_menu{
      display : flex;
      flex-direction : column;
      align-items : center;
    }
    .header_right{
      display : none;
    }
    .header-menu-item {
      margin : auto auto;
      height : 100px;
      width : 100%;
      letter-spacing: 2px;
      text-decoration: none;
    }
  }
`;

const UserName = styled.div`
  font-weight: 800;
  p {
    vertical-align: center;
  }
`;
const Spacer = styled.div`
  height: 70px;
`;

const Header = () => {
  const { name } = useSelector((state) => state.users);
  const [isLogin, setisLogin] = useState('');
  useEffect(() => {
    if (!isLogin) setisLogin(localStorage.getItem('token'));
  }, [isLogin]);
  const URL = `${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIECT_URL}&response_type=code`;

  const onLogout = () => {
    if (isLogin) {
      localStorage.removeItem('token');
      setisLogin('');
      alert('로그아웃 되었습니다.');
    }
  };
  return (
    <React.Fragment>
      <HeaderBlock>
        <Wrapper>
          <div className="header_title">
            <Link to="/" className="title">
              42Chelin
            </Link>
            <div className="title_header_smartphone">
              {isLogin ? (
                <>
                  <UserName>{name}</UserName>
                  <button>리뷰작성</button>
                  <button>로그아웃</button>
                </>
              ) : (
                <button>로그인</button>
              )}
            </div>
          </div>
          <div className="header_menu">
            <Link to="/" className="header-menu-item">
              식당 리뷰
            </Link>
            <Link to="/" className="header-menu-item">
              오늘의 식당 추천
            </Link>
          </div>
          <div className="header_right">
            {isLogin ? (
              <>
                <UserName>
                  <p>{name}</p>
                </UserName>
                <Button name="리뷰 작성" to="/write" />
                <Button name="로그아웃" onClick={onLogout} />
              </>
            ) : (
              <a href={URL}>
                <Button name="로그인" />
              </a>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </React.Fragment>
  );
};

export default Header;
