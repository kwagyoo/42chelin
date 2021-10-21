import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import RestaurantDetail from '../common/RestaurantReviewDetail';
import RestaurantReviewList from '../common/RestaurantReviewList';

const StoreListBlock = styled.div`
  margin-top: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ImgBlock = styled.div``;

const ImgWapper = styled.div``;

const PostDetailPage = () => {
  return (
    <>
      <Header />
      <div>
        <StoreListBlock>
          <ImgWapper>
            <ImgBlock>img</ImgBlock>
          </ImgWapper>
          <RestaurantDetail />
          <RestaurantReviewList />
        </StoreListBlock>
      </div>
    </>
  );
};

export default PostDetailPage;
