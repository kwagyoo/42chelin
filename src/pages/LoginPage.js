import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignBlock from '../block/SignBlock';
import { getFavoriteStores } from '../common/CheckAutoLogin';
import { setCookie } from '../common/Cookie';
import Header from '../common/Header';
import AntModal from '../common/Modal';
import PwResetModal from '../common/PwResetModal';
import TokenVerify from '../common/TokenVerify';
import logo from '../image/Logo.png';
import { fetchLogin } from '../lib/api/auth';
import client from '../lib/api/client';
import { setIsLogin } from '../module/users';

const LoginPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });
  const { id, password } = inputs; // 비구조화 할당을 통해 값 추출
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      setIsError(false);
      setLoading(true);
      const res = await fetchLogin(id, password);
      sessionStorage.setItem('clusterName', id);
      const accToken = res.data.access_token;
      const refToken = res.data.refresh_token;
      dispatch(setIsLogin(true));
      const expires = new Date();
      if (e.target.autoLogin.checked) expires.setDate(expires.getDate() + 7);
      else expires.setMinutes(expires.getMinutes() + 20);
      if (accToken) {
        setCookie('accToken', accToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
          expires: expires,
        });
        client.defaults.headers.common['Authorization'] = `Bearer ${accToken}`;
      }
      if (refToken) {
        setCookie('refToken', refToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
          expires: e.target.autoLogin.checked ? expires : '',
        });
      }
      await getFavoriteStores();
      setTimeout(() => {
        TokenVerify();
      }, 1000 * 60 * 15 + 1000);
      localStorage.setItem('autoLogin', e.target.autoLogin.checked);
      history.push('/');
    } catch (e) {
      setIsError(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('clusterName')) {
      alert('로그아웃 해주세요');
      history.push('/');
    }
  }, [history]);
  return (
    <>
      <Header />
      {loading && <AntModal visible="true" loadingText={'로그인중..'} />}
      {show && <PwResetModal setShow={setShow} />}
      <SignBlock onSubmit={onLogin}>
        <img src={logo} alt="logo" />
        <div className="idForm">
          <input
            placeholder="cluster id"
            className="id"
            onChange={onChange}
            name="id"
            value={id}
            required
            autoComplete="on"
          ></input>
        </div>
        <div className="pwForm">
          <input
            type="password"
            placeholder="password"
            className="pw"
            onChange={onChange}
            name="password"
            value={password}
            required
            autoComplete="on"
          ></input>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 0 10px 30px',
            textAlign: 'left',
          }}
        >
          <input type="checkbox" name="autoLogin" id="autoLogin" />
          <label htmlFor="autoLogin" style={{ marginLeft: '5px' }}>
            로그인 상태 유지
          </label>
        </div>

        <div
          style={{ visibility: isError ? 'visible' : 'hidden', color: 'red' }}
        >
          <p>ID 혹은 비밀번호가 틀렸습니다.</p>
        </div>
        <button className="btn" disabled={loading}>
          Login
        </button>
        <div className="login-div">
          <button onClick={() => history.push('/register')}>
            아이디가 없으신가요?
          </button>
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
            }}
          >
            비밀번호 초기화
          </button>
        </div>
      </SignBlock>
    </>
  );
};

export default LoginPage;
