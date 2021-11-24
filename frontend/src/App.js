import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StoreDetailPage from './pages/StoreDetailPage';
import StorelistPage from './pages/StorelistPage';
import ReviewUpdatePage from './pages/ReviewUpdatePage';
import ReviewWritePage from './pages/ReviewWritePage';
import KakaoSearchPage from './pages/KakaoSearchPage';
import SearchPage from './pages/SearchPage';
import AWS from 'aws-sdk';
import Auth from './hoc/auth';
import RandomStore from './pages/RandomStore';
import Footer from './common/Footer';

const App = () => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:9449a853-9bf7-437d-8205-a66cfc556ecd', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  return (
    <>
      <Route path="/" component={StorelistPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail" component={StoreDetailPage} />
      <Route path="/update" component={Auth(ReviewUpdatePage, true)} />
      <Route path="/write" component={Auth(ReviewWritePage, true)} />
      <Route path="/search" component={SearchPage} />
      <Route path="/storeSearch" component={Auth(KakaoSearchPage, true)} />
      <Route path="/random" component={RandomStore} />
      <Footer />
    </>
  );
};

export default App;
