import { getCookie, removeCookie } from './Cookie';
import jwt from 'jsonwebtoken';
import TokenVerify from './TokenVerify';
import client from '../lib/api/client';

const checkAutoLogin = async () => {
  if (
    localStorage.getItem('autoLogin') === 'true' &&
    !sessionStorage.getItem('clusterName')
  ) {
    const accToken = getCookie('accToken');
    if (accToken) {
      let todayDate = Date.now();
      let decoded = jwt.verify(accToken, process.env.REACT_APP_JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });

      if (todayDate > decoded.exp) {
        //갱신요청
        try {
          client.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accToken}`;
          console.log('재발급');
          await TokenVerify();
          sessionStorage.setItem('clusterName', decoded.clusterName);
        } catch (err) {
          alert('자동 로그인에 문제가 발생하였습니다.');
          removeCookie('accToken');
          removeCookie('refToken');
          client.defaults.headers.common['Authorization'] = null;
        }
      } else {
        //로그인 유지
        sessionStorage.setItem('clusterName', decoded.clusterName);
      }
    }
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
