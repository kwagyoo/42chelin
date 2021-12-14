import { useEffect } from 'react';
import TokenVerify from '../common/TokenVerify';

export const Auth = (Component, adminRoute = null) => {
  const AuthCheck = (props) => {
    useEffect(() => {
      TokenVerify()
        .then()
        .catch((e) => console.error(e));
    }, []);

    return <Component />;
  };
  return AuthCheck;
};
