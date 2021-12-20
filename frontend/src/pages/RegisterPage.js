import { useState } from 'react';
import SignBlock from '../block/SignBlock';
import logo from '../image/Logo.png';
import queryString from 'query-string';
import { fetchRegister } from '../lib/api/auth';
import history from '../hoc/history';

const RegisterPage = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, password, passwordConfirm } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const query = queryString.parse(location.search);
    const code = query.code;
    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.match(pattern) === null) {
      setError('이메일 형식이 아닙니다');
      return;
    }
    if (password.length < 5 && password.length > 13) {
      setError('비밀번호는 5자리에서 13자리로 정해주세요');
      return;
    }
    if (passwordConfirm.length > 0 && password !== passwordConfirm) {
      setError('비밀번호가 다릅니다');
      return;
    } else setError('');
    try {
      const response = await fetchRegister(code, email, password);
      console.log(response);
      history.push('/login');
    } catch (e) {
      console.error(e.response);
    }
    setLoading((loading) => !loading);
  };
  return (
    <SignBlock onSubmit={registerUser}>
      <img src={logo} alt="logo" />
      <div className="idForm">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="id"
          onChange={onChange}
          autoComplete="email"
          value={email}
          required
        ></input>
      </div>
      <div className="pwForm">
        <input
          name="password"
          type="password"
          placeholder="pw"
          className="pw"
          onChange={onChange}
          autoComplete="on"
          value={password}
          required
        ></input>
      </div>
      <div className="pwConfirmForm">
        <input
          name="passwordConfirm"
          type="password"
          placeholder="pw 확인"
          className="pwConfirm"
          onChange={onChange}
          autoComplete="on"
          value={passwordConfirm}
          required
        ></input>
      </div>
      <div>{error}</div>
      <button className="btn" disabled={loading}>
        Register
      </button>
    </SignBlock>
  );
};

export default RegisterPage;
