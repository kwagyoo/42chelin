import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostlistPage from './pages/PostlistPage';
import PostWritePage from './pages/PostWritePage';
import KakaoSearchPage from './pages/KakaoSearchPage';
import SearchPage from './pages/SearchPage';
import imgUpload from './pages/test';

const App = () => {
  return (
    <>
      <Route path="/" component={PostlistPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail" component={PostDetailPage} />
      <Route path="/write" component={PostWritePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/storeSearch" component={KakaoSearchPage} />
      <Route path="/test" component={imgUpload} />
    </>
  );
};

export default App;
