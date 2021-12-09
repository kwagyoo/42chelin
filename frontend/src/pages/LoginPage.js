// import { useState } from 'react';
import SignBlock from '../block/SignBlock';
import { setCookie } from '../common/Cookie';
import Header from '../common/Header';
import TokenVerify from '../common/TokenVerify';
import logo from '../image/Logo.png';
import { fetchLogin } from '../lib/api/auth';

const LoginPage = () => {
  //   const [loading, setLoading] = useState(false);
  //   const URL = `${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIECT_URL}&response_type=code`;

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      const id = 'hyunyoo';
      const pw = 'asdf1234';
      //   await TokenVerify();
      const res = await fetchLogin(id, pw);
      console.log('res', res);
      const accToken = res.data.access_token;
      const refToken = res.data.refresh_token;

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
    } catch (e) {
      console.error('1', e);
    }
  };

  return (
    <>
      <Header />
      <SignBlock onSubmit={onLogin}>
        <img src={logo} alt="logo" />
        <div className="idForm">
          <input placeholder="Id" className="id"></input>
        </div>
        <div className="pwForm">
          <input type="password" placeholder="Pw" className="pw"></input>
        </div>
        <button className="btn">Login</button>
        <div>Don't you have ID?</div>
      </SignBlock>
    </>
  );
};

export default LoginPage;
