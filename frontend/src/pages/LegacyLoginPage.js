import React, { useEffect } from 'react';
import Header from '../common/Header';
import Loading from '../common/Loading';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { fetchToken, fetchUser } from '../lib/api/auth';
import { getUserName, setAccessToken } from '../module/users';
import * as Sentry from '@sentry/react';

const GetUsername = async (token, dispatch) => {
  const res = await fetchUser(token);
  const username = JSON.parse(res.data.body).nickname;
  localStorage.setItem('username', username);
  dispatch(getUserName(username));
};

const LoginRequest = async ({ location, dispatch, history }) => {
  const query = queryString.parse(location.search);
  const code = query.code;
  try {
    const res = await fetchToken(code);
    const token = res.data.body.access_token;
    await GetUsername(token, dispatch);
    localStorage.setItem('token', token);
    dispatch(setAccessToken());
    history.push('/');
  } catch (e) {
    Sentry.captureException(e);
    alert(e.response.data.message);
    history.push('/');
  }
};

const LoginRequestEvent = ({ location, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    LoginRequest({ location, dispatch, history });
  }, [dispatch, location, history]);

  return (
    <React.Fragment>
      <Header />
      <Loading loadingText="로그인 중 .." />
    </React.Fragment>
  );
};

export default LoginRequestEvent;
