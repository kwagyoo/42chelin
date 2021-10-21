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
  height: 70px;
  z-index: 999;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .title {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .title:visited {
    color: #000;
  }
  .header-menu-item {
    margin-left: 5px;
    margin-right: 25px;
    display: left;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .header-menu-item:visited {
    color: #000;
  }
  .right {
    align-items: center;
    display: flex;
  }
`;

const UserName = styled.div`
  font-weight: 800;
  margin-right: 1rem;
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
    }
  };
  return (
    <React.Fragment>
      <HeaderBlock>
        <Wrapper>
          <div>
            <Link to="/" className="title">
              42Chelin
            </Link>
            <Link to="/" className="header-menu-item">
              식당 리뷰
            </Link>
            <Link to="/" className="header-menu-item">
              오늘의 식당 추천
            </Link>
          </div>
          {isLogin ? (
            <div className="right">
              <UserName>{name}</UserName>
              <Link to="/write">
                <Button name="리뷰 작성" />
              </Link>
              <Button name="로그아웃" onClick={onLogout} />
            </div>
          ) : (
            <div className="right">
              <a href={URL}>
                <Button name="로그인" />
              </a>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </React.Fragment>
  );
};

export default Header;
