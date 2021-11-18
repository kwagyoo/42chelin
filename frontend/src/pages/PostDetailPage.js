/* global kakao */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import qs from 'qs';
import Carousel from '../common/Carousel';

const StoreListBlock = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: space-between;
  flex-direction: column;
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 960px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    .carousel {
      margin: auto;
    }
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 200px;
`;

const Wrapper = styled.div`
  font-family: 'Do Hyeon', sans-serif;

  display: flex;
  justify-content: space-between;
  #map {
    width: 500px;
    height: 200px;
  }
  @media (max-width: 1500px) {
    #map {
      width: 380px;
    }
  }

  @media (max-width: 1000px) {
    #map {
      width: 330px;
    }
  }

  @media (max-width: 960px) {
    display: flex;
    justify-content: center;
    #map {
      width: 350px;
      margin: 50px auto;
    }
  }
`;

const PostDetailPage = ({ location }) => {
  const [storeList, setstoreList] = useState('');

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getStore = async () => {
    try {
      const userName = localStorage.getItem('username');
      const res = await getStoreDetailData({ ...query, userName });
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
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);

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
      <Wrapper>
        {storeList && (
          <ContentsWrapper>
            <StoreListBlock>
              <FlexWrapper className="flexwrapper">
                <Carousel images={storeList.storeImages} />
                <div id="map" />
              </FlexWrapper>
              <StoreReviewDetail storeList={storeList} />
            </StoreListBlock>
            <StoreReviewList
              store={storeList}
              storeReviews={storeList.storeReviews}
            />
          </ContentsWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default PostDetailPage;
