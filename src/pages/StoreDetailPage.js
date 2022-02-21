/* global kakao */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import Carousel from '../common/Carousel';
import StoreReviewDetailBlock from '../block/StoreReviewDetailBlock';
import StoreReviewListBlock from '../block/StoreReviewListBlock';
import { getStoreDetail } from '../lib/api/store';
import qs from 'qs';
import { loadImageFromS3 } from '../lib/api/aws';
import { toggleLikeStore } from '../lib/api/store';
import { useHistory, useLocation } from 'react-router-dom';

const StoreListBlock = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: space-between;
  flex-direction: column;
`;

const FlexWrapper = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;
  #map {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 15%;
    margin-left: 5px;
  }

  @media (max-width: 1023px) {
    #map {
      flex-basis: 35%;
    }
  }
  @media (max-width: 728px) {
    flex-direction: column;
    height: 550px;
  }
  @media (max-width: 425px) {
    #map {
      flex-basis: 25%;
    }
    height: 500px;
    flex-direction: column;
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 200px;
`;

const Wrapper = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
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
  } catch (e) {
    if (e.response) {
      alert(e.response.data.message);
    } else console.error(e);
  }
};

const StoreDetailPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [storeList, setStoreList] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeButtonDisable, setLikeButtonDisable] = useState(false);
  const [visited, setVisited] = useState(
    JSON.parse(localStorage.getItem('visited') || '[]'),
  );
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem('visited', JSON.stringify(visited));
  }, [visited]);

  const getStore = async () => {
    const clusterName = localStorage.getItem('clusterName');
    let res;
    try {
      res = await getStoreDetail({ ...query, clusterName });
      const { storeName, storeAddress, storeID, storeCategoryName } = res.data;
      const fixedImages = await getImageURLsFromS3(res.data);
      const data = {
        storeName,
        storeAddress,
        storeID,
        storeCategoryName,
        storeImage: fixedImages.storeImages[0]?.image,
        storeImageURL: fixedImages.storeImages[0]?.imageURL,
      };
      const dupArr = [data, ...visited];
      const filterData = dupArr.filter((item, index) => {
        return (
          dupArr.findIndex((item2, j) => {
            return item.storeID === item2.storeID;
          }) === index
        );
      });
      setVisited(filterData);
      setStoreList(fixedImages);
      setLikes(res.data.storeLikes);
      setIsLike(res.data.isLike);
    } catch (e) {
      if (e.response?.status < 500) {
        if (e.response?.status === 403) {
          alert('토큰이 만료되었습니다. 새로고침을 진행합니다.');
          history.go(0);
        } else {
          alert('잘못된 요청입니다.');
        }
      } else if (e.response) alert('서버에 문제가 발생하였습니다.');
      else {
        alert('처리 중 오류가 발생하였습니다.');
        console.error(e);
      }
      return e.response?.status;
    }

    try {
      const storeLocation = res.data.storeLocation;
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
  }, [location]);

  const ToggleLike = async () => {
    if (likeButtonDisable) return;
    const like = likes;
    const islike = isLike;
    setIsLike(!isLike);
    setLikeButtonDisable(true);
    setTimeout(() => {
      setLikeButtonDisable(false);
    }, 1000);
    if (isLike) setLikes(likes - 1);
    else setLikes(likes + 1);
    const data = {
      storeID: storeList.storeID,
      clusterName: sessionStorage.getItem('clusterName'),
      isLike: !isLike,
    };
    try {
      const res = await toggleLikeStore(data);
      setLikes(res.data.likes);
      if (!islike) {
        const parsedStore = JSON.parse(
          sessionStorage.getItem('favoriteStore') || '[]',
        );
        parsedStore.push({
          storeName: storeList.storeName,
          storeAddress: storeList.storeAddress,
          storeID: storeList.storeID,
          storeImage: storeList.storeImages[0]?.image,
          storeImageURL: storeList.storeImages[0]?.imageURL,
          storeCategoryName: storeList.storeCategoryName,
        });
        sessionStorage.setItem('favoriteStore', JSON.stringify(parsedStore));
      } else
        sessionStorage.setItem(
          'favoriteStore',
          JSON.stringify(
            JSON.parse(sessionStorage.getItem('favoriteStore')).filter(
              (x) => x.storeName !== storeList.storeName,
            ),
          ),
        );
    } catch (e) {
      if (e.response) console.error(e.response.data.message);
      else console.error(e.message);
      setIsLike(islike);
      setLikes(like);
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
                <Carousel
                  images={storeList.storeImages.slice(
                    0,
                    storeList.storeImages.length > 10
                      ? 10
                      : storeList.storeImages.length,
                  )}
                />
                <div id="map" />
              </FlexWrapper>
              <StoreReviewDetailBlock
                storeList={storeList}
                ToggleLike={ToggleLike}
                isLike={isLike}
                likes={likes}
                likeButtonDisable={likeButtonDisable}
              />
            </StoreListBlock>
            <StoreReviewListBlock
              store={storeList}
              storeReviews={storeList.storeReviews}
            />
          </ContentsWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default StoreDetailPage;
