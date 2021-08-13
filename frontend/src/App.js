import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostDetailPage from './pages/PostDetailPage';
import PostlistPage from './pages/PostlistPage';
import PostWritePage from './pages/PostWritePage';

const App = () => {
  const URL =
    'https://api.intra.42.fr/oauth/authorize?client_id=c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code';

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
