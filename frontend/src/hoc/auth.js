import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (SpecialComponent, option, _adminRoute = null) => {
  /*
     예)  option: null -> 누구나 출입이 가능한 페이지 (home)
                 true -> 로그인한 유저만 출입이 가능한 페이지
                 false -> 로그인한 유저는 출입이 불가능한 페이지
  */

  const AuthenticateCheck = (props) => {
    const name = localStorage.getItem('username');

    useEffect(() => {
      if (!name && option) {
        props.history.push('/');
      }
    }, [name, props.history]);

    return <SpecialComponent />;
  };

  return AuthenticateCheck;
};
