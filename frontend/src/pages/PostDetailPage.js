import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import testImg from '../image/15935670615efbe7551de0b.jpg';
import qs from 'qs';

const StoreListBlock = styled.div`
  margin-top: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ImgBlock = styled.img``;

const ImgWapper = styled.div``;

const ContentsWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
`;

const PostDetailPage = ({ location }) => {
  const [storeList, setstoreList] = useState('');
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getStore = async () => {
    try {
      const res = await getStoreDetailData(query);
      setstoreList(res.data.body);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStore();
    return () => {
      setstoreList('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ContentsWrapper>
        <StoreListBlock>
          <ImgWapper>
            <ImgBlock src={testImg} alt="tmp" />
          </ImgWapper>
          <StoreReviewDetail storeList={storeList} />
        </StoreListBlock>
        <StoreReviewList storeReviews={storeList.storeReviews} />
      </ContentsWrapper>
    </>
  );
};

export default PostDetailPage;
