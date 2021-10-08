import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, getUser } from '../lib/api/auth';
import { getUserName, setAccessToken } from '../module/users';

const GetUsername = async (token, dispatch) => {
  try {
    const res = await getUser(token);
    const username = res.data.login;
    console.log('username save success');
    dispatch(getUserName(username));
  } catch (e) {
    console.log(e);
  }
};

const LoginRequest = async ({ location, dispatch }) => {
  const query = queryString.parse(location.search);
  const code = query.code;
  console.log(code);
  try {
    const res = await login(code);
    const data = JSON.parse(res.data.body);
    const token = data.access_token;
    console.log(token);
    console.log('token success');
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
    dispatch(setAccessToken());
    GetUsername(token, dispatch);
  } catch (e) {
    console.log(e);
    alert('로그인에 실패했습니다.');
  }
};

const LoginRequestEvent = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('hello');
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
