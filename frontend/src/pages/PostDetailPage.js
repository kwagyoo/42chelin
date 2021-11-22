/* global kakao */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import StoreReviewDetail from '../common/StoreReviewDetail';
import StoreReviewList from '../common/StoreReviewList';
import { getStoreDetailData } from '../lib/api/store';
import qs from 'qs';
import Carousel from '../common/Carousel';
import { loadImageFromS3 } from '../lib/api/aws';
import { ToggleLikeStore } from '../lib/api/store';

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
  background-color: #fafafa;

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
  @media (max-width: 400px) {
    display: flex;
    justify-content: center;
    #map {
      width: 300px;
      margin: 50px auto;
    }
  }
`;

const getImageURLsFromS3 = async (storeList) => {
  try {
    const fixedReviews = await Promise.all(
      storeList.storeReviews.map(async (review) => {
        const imageURLs = await Promise.all(
          review.images.map(async (image) => {
            const imageURL = await loadImageFromS3(image);
            return { image, imageURL };
          }),
        );
        return { ...review, images: imageURLs };
      }),
    );

    return {
      ...storeList,
      storeImages: fixedReviews.map((review) => review.images).flat(),
      storeReviews: fixedReviews,
    };
  } catch (error) {
    console.error(error);
  }
};

const PostDetailPage = ({ location }) => {
  const [storeList, setStoreList] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const getStore = async () => {
    try {
      const userName = localStorage.getItem('username');
      const res = await getStoreDetailData({ ...query, userName });
      setStoreList(await getImageURLsFromS3(res.data.body));

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
      setStoreList('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ToggleLike = async () => {
    setIsLike(!isLike);
    const data = {
      token: localStorage.getItem('token'),
      storeName: storeList.storeName,
      storeAddress: storeList.storeAddress,
      userName: localStorage.getItem('username'),
      isLike: !isLike,
    };
    try {
      const res = await ToggleLikeStore(data);
      setLikes(res.data.body.likes);
    } catch (e) {
      console.error(e);
    }
  };

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
              <StoreReviewDetail
                storeList={storeList}
                ToggleLike={ToggleLike}
                isLike={isLike}
              />
            </StoreListBlock>
            <StoreReviewList
              store={storeList}
              storeReviews={storeList.storeReviews}
              likes={likes}
            />
          </ContentsWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default PostDetailPage;
