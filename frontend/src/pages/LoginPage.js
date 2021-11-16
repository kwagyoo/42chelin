import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { getToken, getUser } from '../lib/api/auth';
import { getUserName, setAccessToken } from '../module/users';
import Loading from '../common/Loading';
import * as Sentry from '@sentry/react';

const GetUsername = async (token, dispatch) => {
  try {
    const res = await getUser(token);
    const username = JSON.parse(res.data.body).nickname;
    localStorage.setItem('username', username);
    dispatch(getUserName(username));
  } catch (e) {
    Sentry.captureException(e);
    console.log(e);
  }
};

const LoginRequest = async ({ location, dispatch, history }) => {
  const query = queryString.parse(location.search);
  const code = query.code;
  try {
    const res = await getToken(code);
    const data = JSON.parse(res.data.body);
    const token = data.access_token;
    localStorage.setItem('token', token);
    dispatch(setAccessToken());
    await GetUsername(token, dispatch);
    history.push('/');
  } catch (e) {
    Sentry.captureException(e);
    console.log(e);
    alert('로그인에 실패했습니다.');
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
