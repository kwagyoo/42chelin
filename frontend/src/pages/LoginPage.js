import React, { useEffect } from 'react';
import Header from '../common/Header';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getToken, getUser } from '../lib/api/auth';
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
  try {
    console.log(process.env.REACT_APP_BACKEND_ENDPOINT_URL);
    const res = await getToken(code);
    console.log('getToken 성공');
    console.log(res);
    const data = JSON.parse(res.data);
    console.log(data);
    const token = data.access_token;
    localStorage.setItem('token', token);
    dispatch(setAccessToken());
    console.log('token dispatch 성공');
    GetUsername(token, dispatch);
  } catch (e) {
    console.log(e);
    alert('로그인에 실패했습니다.');
  }
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
