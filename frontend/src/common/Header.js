import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const HeaderBlock = styled.div`
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
  height: 70px;
`;

const Header = () => {
  const URL =
    'https://api.intra.42.fr/oauth/authorize?client_id=c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code';

  return (
    <React.Fragment>
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
            <a href={URL}>
              <Button name="로그인" />
            </a>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </React.Fragment>
  );
};

export default Header;
