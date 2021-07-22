import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .home {
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .home:visited {
    color: #000;
  }
  .recommend {
    display: left;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .recommend:visited {
    color: #000;
  }
  .right {
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div>
            <Link to="/" className="home">
              42Chelin
            </Link>
            <Link to="/" className="recommend">
              오늘의 식당 추천
            </Link>
          </div>
          <div className="right">
            <Button />
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
