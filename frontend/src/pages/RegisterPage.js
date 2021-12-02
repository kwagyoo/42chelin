import { useState } from 'react';
import SignBlock from '../block/SignBlock';
import logo from '../image/Logo.png';
import queryString from 'query-string';
import { fetchRegister } from '../lib/api/auth';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const RegisterPage = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const registerUser = async (res) => {
    const query = queryString.parse(location.search);
    const code = query.code;
    try {
      await fetchRegister(code, res.id, res.password);
      history.push('/');
    } catch (e) {
      console.error(e.response);
    }
    setLoading((loading) => !loading);
  };
  return (
    <SignBlock onSubmit={handleSubmit(registerUser)}>
      <img src={logo} alt="logo" />
      <div className="idForm">
        <input placeholder="Id" className="id" {...register('id')}></input>
      </div>
      <div className="pwForm">
        <input
          type="password"
          placeholder="Pw"
          className="pw"
          {...register('password')}
        ></input>
      </div>
      <div className="pwConfirmForm">
        <input
          type="password"
          placeholder="Pw 확인"
          className="pwConfirm"
        ></input>
      </div>
      <button className="btn" disabled={loading}>
        Register
      </button>
      <div>Don't you have ID?</div>
    </SignBlock>
  );
};

export default RegisterPage;
