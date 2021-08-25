import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getToken, getUser } from '../lib/api/auth';
import { getUserName } from '../module/users';

const GetUsername = async (token, dispatch) => {
  getUser(token)
    .then((res) => {
      const username = res.data.login;
      console.log('username save success');
      dispatch(getUserName(username));
    })
    .catch((error) => console.log(error));
};

const LoginRequest = async ({ location, dispatch }) => {
  const query = queryString.parse(location.search);
  const code = query.code;

  getToken(code)
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
