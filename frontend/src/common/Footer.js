import styled from 'styled-components';
import logo from '../image/LogoWhite.png';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 5%;
  margin-top: 10px;
  background-color: #333;
  color: #bbbbbb;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  a {
    color: #bbbbbb;
    :hover {
      color: #ffffff;
    }
  }
  .footer_content {
    display: flex;
    flex-direction: column;
  }
  .footer_logo {
    img {
      width: 200px;
      height: 100px;
      margin-right: 53px;
      padding-bottom: 10px;
    }
    @media (max-width: 425px) {
      img {
        display: none;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer_content">
        <span>Copyright 2021. All Rights Reserved.</span>
        <span>개발자 : bkwag, hyunyoo</span>
        <span>
          github :
          <a href="https://github.com/kwagyoo/42chelin">
            https://github.com/kwagyoo/42chelin
          </a>
        </span>
        <span> 버그 제보는 이슈로 남겨주세요</span>
      </div>
      <div className="footer_logo">
        <img src={logo} alt="title" />
      </div>
    </StyledFooter>
  );
};

export default Footer;
