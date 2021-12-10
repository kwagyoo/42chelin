import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignBlock from '../block/SignBlock';
import { setCookie } from '../common/Cookie';
import Header from '../common/Header';
import logo from '../image/Logo.png';
import { fetchLogin } from '../lib/api/auth';
import { setIsLogin } from '../module/users';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });

  const { id, password } = inputs; // 비구조화 할당을 통해 값 추출

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
      const res = await fetchLogin(id, password);
      sessionStorage.setItem('username', id);
      const accToken = res.data.access_token;
      const refToken = res.data.refresh_token;
      dispatch(setIsLogin(true));
      if (accToken) {
        setCookie('accToken', accToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
      if (refToken) {
        setCookie('refToken', refToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
      history.push('/');
    } catch (e) {
      console.error('1', e);
      setLoading((loading) => !loading);
    }
  };

  return (
    <>
      <Header />
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
        <button className="btn" disabled={loading}>
          Login
        </button>
        <div>Don't you have ID?</div>
      </SignBlock>
    </>
  );
};

export default LoginPage;
