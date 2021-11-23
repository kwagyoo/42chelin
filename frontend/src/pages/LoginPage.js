import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { getToken, getUser } from '../lib/api/auth';
import { getUserName, setAccessToken } from '../module/users';
import Loading from '../common/Loading';
import * as Sentry from '@sentry/react';

const GetUsername = async (token, dispatch, history) => {
  try {
    const res = await getUser(token);
    const username = JSON.parse(res.data.body).nickname;
    localStorage.setItem('username', username);
    dispatch(getUserName(username));
  } catch (e) {
    console.log('error', e.message);
    Sentry.captureException(e);
    alert('username이 존재하지 않습니다');
    history.push('/');
  }
};

const LoginRequest = async ({ location, dispatch, history }) => {
  const query = queryString.parse(location.search);
  const code = query.code;
  try {
    const res = await getToken(code);
    const token = res.data.body.access_token;
    await GetUsername(token, dispatch);
    localStorage.setItem('token', token);
    dispatch(setAccessToken());
    history.push('/');
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);
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
