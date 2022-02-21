import { getCookie, removeCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import TokenVerify from './TokenVerify';
import client from '../lib/api/client';
import { fetchMyStores } from '../lib/api/store';
import { loadImageFromS3 } from '../lib/api/aws';

export const getFavoriteStores = async () => {
  const clusterName = sessionStorage.getItem('clusterName');
  if (!clusterName) return;
  const res = await fetchMyStores(clusterName);
  const fixedStore = await Promise.all(
    res.data.map(async (store) => {
      if (store.images) {
        const fixImage = await loadImageFromS3(store.images);
        return { ...store, storeImageURL: fixImage };
      }
      return store;
    }),
  );
  sessionStorage.setItem('favoriteStore', JSON.stringify(fixedStore));
};

const checkAutoLogin = async () => {
  if (localStorage.getItem('autoLogin') === 'true') {
    if (!sessionStorage.getItem('clusterName')) {
      const accToken = getCookie('accToken');
      if (accToken) {
        let todayDate = Date.now();
        let decoded = jwt.verify(
          accToken,
          process.env.REACT_APP_JWT_SECRET_KEY,
          {
            ignoreExpiration: true,
          },
        );

        if (todayDate > decoded.exp) {
          //갱신요청
          try {
            client.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${accToken}`;
            await TokenVerify();
            sessionStorage.setItem('clusterName', decoded.clusterName);
            await getFavoriteStores();
          } catch (err) {
            console.log('auto login catch');
            alert('자동 로그인에 문제가 발생하였습니다.');
            removeCookie('accToken');
            removeCookie('refToken');
            delete client.defaults.headers.common['Authorization'];
          }
        } else {
          //로그인 유지
          sessionStorage.setItem('clusterName', decoded.clusterName);
        }
      }
    }
  } else {
    removeCookie('accToken');
    removeCookie('refToken');
  }
  //access token 가져와서 decode해서
  //sessionStrage에 username을 넣어야함
};

//좋아요 기능(일단 적용하고 나중에 후처리)
//access token를 가져와서 일단 기간 안따지고 clusterName을 가져옴
//헤더에 clusterName을 넣어주고 checkAutoLogin에서는 access token이 만료가 되었으면
//refresh 요청=>refresh가 되었으면 그냥 조용히 쿠키만 저장해서 유지
//만약 실패를 했으면 alert('로그인에 문제가 발생했습니다.') 강제 로그아웃

export default checkAutoLogin;
