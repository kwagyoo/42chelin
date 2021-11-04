/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import qs from 'qs';
import ImageGallery from 'react-image-gallery';
import test from '../image/15199842115a991e53d3ee3.jpg';
import test2 from '../image/15463011825c2aaefec93d1.jpg';
import test3 from '../image/15513421885c779a6cbde26.jpg';

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
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  #map {
    width: 500px;
    height: 400px;
  }
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

  const images = [
    {
      original: `${test}`,
      thumbnail: `${test}`,
    },
    {
      original: `${test2}`,
      thumbnail: `${test2}`,
    },
    {
      original: `${test3}`,
      thumbnail: `${test3}`,
    },
  ];

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488,
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  return (
    <>
      <Header />
      <Wrapper>
        {storeList && (
          <ContentsWrapper>
            <StoreListBlock>
              <ImgWapper>
                <ImageGallery items={images} />
                {/* <ImgBlock src={testImg} alt="tmp" /> */}
              </ImgWapper>
              <StoreReviewDetail storeList={storeList} />
            </StoreListBlock>
            <StoreReviewList storeReviews={storeList.storeReviews} />
          </ContentsWrapper>
        )}
        <div id="map">test</div>
      </Wrapper>
    </>
  );
};

export default PostDetailPage;
