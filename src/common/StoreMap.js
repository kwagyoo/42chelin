/* global kakao */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllStore } from '../lib/api/store';

const Container = styled.div`
  #map {
    display: block;
    width: 100%;
    height: 700px;
    min-height: 300px;
  }
  .customoverlay {
    position: relative;
    bottom: 0px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;

    a {
      display: block;
      text-decoration: none;
      color: #000;
      text-align: center;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      overflow: hidden;
      background: #454545;
    }
    .title {
      display: block;
      text-align: center;
      background: #fff;
      margin-right: 35px;
      padding: 10px 15px;
      font-size: 14px;
      font-weight: bold;
    }
    .customoverlay:nth-of-type(n) {
      border: 0;
      box-shadow: 0px 1px 2px #888;
    }
    ::after {
      content: '';
      position: absolute;
      margin-left: -12px;
      left: 50%;
      bottom: -12px;
      width: 22px;
      height: 12px;
      background-image: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
    }
  }
`;

const StoreMap = ({ history }) => {
  const [storeList, setStoresList] = useState([]);

  useEffect(() => {
    const getMapStore = async () => {
      const res = await getAllStore();
      setStoresList(res.data.data);
    };
    getMapStore();
    return () => {};
  }, []);

  useEffect(() => {
    //map size
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng('37.48876874970571', '127.04863092330766'),
      level: 7,
    };
    var map = new kakao.maps.Map(container, options);
    //zoomcontrol
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //marker
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    var imageSize = new kakao.maps.Size(24, 35);
    var normalImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    // eslint-disable-next-line array-callback-return
    storeList.map((store) => {
      const latlng = new kakao.maps.LatLng(
        store.storeLocation[1],
        store.storeLocation[0],
      );
      const marker = new kakao.maps.Marker({
        // eslint-disable-line no-unused-vars
        map: map, // ????????? ????????? ??????
        position: latlng, // ????????? ????????? ??????
        image: normalImage, // ?????? ?????????
      });
      var basicInfo = `<div class="customoverlay">
	  <a href="https://map.kakao.com/link/map/11394059"
		target="_blank">
		<span class="title">
		  ${store.storeName}
		</span>
	  </a>
	</div>`;
      // ????????? ??????????????? ???????????????
      var customOverlay = new kakao.maps.CustomOverlay({
        clickable: true,
        position: latlng,
        content: basicInfo,
        xAnchor: 0.5,
        yAnchor: 2.3,
        zIndex: 3,
      });
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        // ????????? ??????????????? ???????????? ???????????? ?????????????????? ???????????? ???????????????
        customOverlay.setMap(map);
      });
      // ????????? ??????????????? ???????????? ???????????????
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        // ????????? ??????????????? ???????????? ???????????? ?????????????????? ???????????????
        customOverlay.setMap(null);
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        // ?????? ?????? ?????????????????? ???????????????
        if (!store) return;
        history.push(
          `/detail?storeID=${store.storeID}&storeAddress=${store.storeAddress}`,
        );
      });
    });
  });

  return (
    <Container>
      <div id="map" />
    </Container>
  );
};

export default StoreMap;
