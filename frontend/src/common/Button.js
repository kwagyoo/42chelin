import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-right: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #495057;
  &:hover {
    background: #adb5bd;
  }
`;

// const StyledLink = styled(Link)`
//   ${StyledButton}
// `;

const Button = () => {
  return <StyledButton>로그인</StyledButton>;
};

export default Button;
