import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

const Store = styled.span`
  flex-direction: row;
  span {
    word-wrap: break-word;
  }
`;

const PostBlock = ({ src }) => {
	const fadein = useSpring({
		from:{y:'15px', opacity:0},
		to:{y:'0px', opacity:1},
		config: { duration: 2000 }
	});
  return (
    <React.Fragment>
		<animated.div style={fadein}>
			<img src={src.default} alt="pokemon" />
			<br />
			<span>이름 : 펄기아</span>
			<br />
			<span>출현 : 관동</span>
			<br />
			<span>타입 : 불꽃</span>
		</animated.div>
    </React.Fragment>
  );
};

export default PostBlock;
