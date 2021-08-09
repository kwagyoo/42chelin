import React from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import axios from 'axios';

const GetUsername = async (token) => {
  console.log('Bearer ' + token);
  await axios({
    method: 'GET',
    url: 'https://api.intra.42.fr/v2/me',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
};

const LoginRequest = async ({ location }) => {
  const query = queryString.parse(location.search);
  const code = query.code;
  //   const error = query.error == 'access_denied';
  //   const usercode = queryString.parse(location.serch);

  await axios({
    method: 'post',
    url: 'https://api.intra.42.fr/oauth/token',
    data: {
      grant_type: 'authorization_code',
      client_id:
        'c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d',
      client_secret:
        'd49df9404304e2bff0365eaec854556af2ce711706f7498caed2d1d5cdd882b3',
      code: code,
      redirect_uri: 'http://localhost:3000/login',
    },
  })
    .then((res) => {
      const token = res.data.access_token;
      GetUsername(token);
    })
    .catch((error) => console.log(error));
};

const LoginRequestEvent = ({ location }) => {
  LoginRequest({ location });
  const URL =
    'https://api.intra.42.fr/oauth/authorize?client_id=c99cdf4885e7223c1e66e3060d56b9aac2dd5927b765593c669c78613a5b679d&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code';
  //   const error = query.error == 'access_denied';
  //   const usercode = queryString.parse(location.serch);
  return (
    <React.Fragment>
      <Header />
      <a href={URL}>login</a>
    </React.Fragment>
  );
};

export default LoginRequestEvent;
