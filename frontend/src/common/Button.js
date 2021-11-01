import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  height: 40px;
  margin: auto 10px;
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: white;
  outline: none;
  cursor: pointer;
  background: #495057;
  &:hover {
    background: #adb5bd;
  }
`;

const StyledButton = styled.button`
  height: 40px;
  margin: auto 10px;
  padding: 10px 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  background: #495057;
  &:hover {
    background: #adb5bd;
  }
  &:disabled {
    background: gray;
    cursor: wait;
  }
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props}>{props.name}</StyledLink>
  ) : (
    <StyledButton
      disabled={props.disabled ? props.disabled : false}
      onClick={props.onClick}
    >
      {props.name}
    </StyledButton>
  );
};

export default Button;
