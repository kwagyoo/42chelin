import React from 'react';
import styled from 'styled-components';

const Store = styled.span`
  flex-direction: row;
  span {
    word-wrap: break-word;
  }
`;

const PostBlock = ({ src }) => {
  return (
    <React.Fragment>
      <Store>
        <img src={src} alt="pokemon"/>
        <br />
        <span>이름 : 펄기아</span>
        <br />
        <span>출현 : 관동</span>
        <br />
        <span>타입 : 불꽃</span>
      </Store>
    </React.Fragment>
  );
};

export default PostBlock;
