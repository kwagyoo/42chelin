import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import RestaurantDetail from '../common/RestaurantReviewDetail';
import RestaurantReviewList from '../common/RestaurantReviewList';
import { getStoreDetailData } from '../lib/api/store';

const StoreListBlock = styled.div`
  margin-top: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ImgBlock = styled.div``;

const ImgWapper = styled.div``;

const detail = async () => {
  const data = {
    storeName: 'asdfdf',
    storeBranch: { city: '11', district: '170', neighborhood: '520' },
  };
  try {
    const res = await getStoreDetailData(data);
    console.log(res.data.body.storeName);
  } catch (e) {
    console.log(e);
  }
};

const PostDetailPage = () => {
  useEffect(() => {
    detail();
  });
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
