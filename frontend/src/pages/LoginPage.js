import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getuser } from '../modules/User';
import { Redirect } from 'react-router-dom';

const GetUsername = async (token, dispatch) => {
  await axios({
    method: 'GET',
    url: 'https://api.intra.42.fr/v2/me',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((res) => {
      const username = res.data.login;
      dispatch(getuser(username));
      console.log('username save success');
    })
    .catch((error) => console.log(error));
};

const LoginRequest = async ({ location, dispatch }) => {
  const query = queryString.parse(location.search);
  const code = query.code;

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
      console.log('token success');
      GetUsername(token, dispatch);
    })
    .catch((error) => console.log(error));
};

const LoginRequestEvent = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    LoginRequest({ location, dispatch });
  }, [dispatch, location]);

  return (
    <React.Fragment>
      <Header />
      <Redirect to="/" />;
    </React.Fragment>
  );
};

export default LoginRequestEvent;
