import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostlistPage from './pages/PostlistPage';
import PostWritePage from './pages/PostWritePage';

const App = () => {
  return (
    <div>
      <Route path="/" component={PostlistPage} exact />
      <Route path="/write" component={PostWritePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/detail" component={PostDetailPage} />
    </div>
  );
};

export default App;
