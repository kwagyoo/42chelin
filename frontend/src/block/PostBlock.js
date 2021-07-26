import React from 'react';
import styled from 'styled-components';

const Store = styled.span`
  flex-direction: row;
`;

const PostBlock = ({ src }) => {
  return (
    <React.Fragment>
      <Store>
        <img src={src} />
        <span>이름 : 펄기아</span> <span>출현 : 관동</span>
        <span>타입 : 불꽃</span>
      </Store>
    </React.Fragment>
  );
};

export default PostBlock;
