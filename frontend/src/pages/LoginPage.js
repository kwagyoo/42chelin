import React from 'react';
import Header from '../common/Header';
import queryString from 'query-string';

const Redirect =
  'https://api.intra.42.fr/oauth/authorize?client_id=c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code';

const LoginRequestEvent = ({ location }) => {
  const query = queryString.parse(location.search);
  const error = query.error == 'access_denied';
  const usercode = queryString.parse(location.serch);
  console.log(query);
  return (
    <React.Fragment>
      <Header />
      <a href={Redirect}>login</a>
    </React.Fragment>
  );
};

export default LoginRequestEvent;
