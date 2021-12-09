// import { useState } from 'react';
import SignBlock from '../block/SignBlock';
import { setCookie } from '../common/Cookie';
import Header from '../common/Header';
import logo from '../image/Logo.png';
import { fetchLogin } from '../lib/api/auth';

const LoginPage = () => {
  //   const [loading, setLoading] = useState(false);
  //   const URL = `${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIECT_URL}&response_type=code`;

  const onLogin = async () => {
    try {
      const id = 'bkwag';
      const pw = 'admin';
      const res = await fetchLogin(id, pw);
      const accToken = res.data.access_token;
      if (accToken) {
        setCookie('accToken', accToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <SignBlock>
        <img src={logo} alt="logo" />
        <div className="idForm">
          <input placeholder="Id" className="id"></input>
        </div>
        <div className="pwForm">
          <input type="password" placeholder="Pw" className="pw"></input>
        </div>
        <button className="btn" onClick={onLogin}>
          Login
        </button>
        <div>Don't you have ID?</div>
      </SignBlock>
    </>
  );
};

export default LoginPage;
