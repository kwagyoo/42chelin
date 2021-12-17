import React from 'react';
import { Route } from 'react-router-dom';
import StoreDetailPage from './pages/StoreDetailPage';
import StorelistPage from './pages/StorelistPage';
import ReviewUpdatePage from './pages/ReviewUpdatePage';
import ReviewWritePage from './pages/ReviewWritePage';
import KakaoSearchPage from './pages/KakaoSearchPage';
import SearchPage from './pages/SearchPage';
import AWS from 'aws-sdk';
import RandomStore from './pages/RandomStore';
import Footer from './common/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './common/PrivateRoute';

const App = () => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:9449a853-9bf7-437d-8205-a66cfc556ecd', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  return (
    <>
      <Route exact path="/" component={StorelistPage} />
      <Route path="/detail" component={StoreDetailPage} />
      <PrivateRoute path="/update" component={ReviewUpdatePage} />
      <PrivateRoute path="/write" component={ReviewWritePage} />
      <Route path="/search" component={SearchPage} />
      <PrivateRoute path="/storeSearch" component={KakaoSearchPage} />
      <Route path="/random" component={RandomStore} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />

      <Footer />
    </>
  );
};

export default App;
