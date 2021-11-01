import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 2px;
  background-color: #9b9b9b;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        <span>개발자 : bkwag, hyunyoo</span>
        <br />
        <span>github : https://github.com/kwagyoo/42chelin</span>
        <br />
        <span>Copyright 2021. All Rights Reserved.</span>
      </p>
    </StyledFooter>
  );
};

export default Footer;
