/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import qs from 'qs';
import ImageGallery from 'react-image-gallery';
import Carousel from '../common/Carousel';

const StoreListBlock = styled.div`
  margin-top: 3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  #map {
    width: 500px;
    height: 200px;
  }
`;

// const StyledSlider = styled.Slider`
//   display: flex;
// `;

const PostDetailPage = ({ location }) => {
  const [storeList, setstoreList] = useState('');

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getStore = async () => {
    try {
      const res = await getStoreDetailData(query);
      setstoreList(res.data.body);

      const storeLocation = res.data.body.storeLocation;
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(
          `${storeLocation[1]}`,
          `${storeLocation[0]}`,
        ),
        level: 3,
      };
      var map = new kakao.maps.Map(container, options);
      var markerPosition = new kakao.maps.LatLng(
        `${storeLocation[1]}`,
        `${storeLocation[0]}`,
      );
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
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
<<<<<<< HEAD
      {storeList && (
        <ContentsWrapper>
          <StoreListBlock>
            <ImgWapper>
              <ImageGallery items={images} />
              {/* <ImgBlock src={testImg} alt="tmp" /> */}
            </ImgWapper>
            <StoreReviewDetail storeList={storeList} />
          </StoreListBlock>
          <StoreReviewList
            store={storeList}
            storeReviews={storeList.storeReviews}
          />
        </ContentsWrapper>
      )}
=======
      <Wrapper>
        {storeList && (
          <ContentsWrapper>
            <StoreListBlock>
              <FlexWrapper>
                <Carousel images={storeList.storeImages} />
                <div id="map" />
              </FlexWrapper>
              <StoreReviewDetail storeList={storeList} />
            </StoreListBlock>
            <StoreReviewList storeReviews={storeList.storeReviews} />
          </ContentsWrapper>
        )}
      </Wrapper>
>>>>>>> bfbda755f817a431a7b4935acfb0ef96e0b2c5f0
    </>
  );
};

export default PostDetailPage;
