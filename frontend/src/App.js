import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostlistPage from './pages/PostlistPage';
import PostUpdatePage from './pages/PostUpdatePage';
import PostWritePage from './pages/PostWritePage';
import KakaoSearchPage from './pages/KakaoSearchPage';
import SearchPage from './pages/SearchPage';
import AWS from 'aws-sdk';
import Auth from './hoc/auth';

const App = () => {
  AWS.config.update({
    region: 'ap-northeast-2', // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-2:9449a853-9bf7-437d-8205-a66cfc556ecd', // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  return (
    <>
      <Route path="/" component={PostlistPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail" component={PostDetailPage} />
      <Route path="/edit" component={PostUpdatePage} />
      <Route path="/write" component={PostWritePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/storeSearch" component={Auth(KakaoSearchPage, true)} />
    </>
  );
};

export default App;
