import QueryString from 'qs';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from '../common/Wrapper';
import { fetchResetPassword } from '../lib/api/auth';

const PwResetPage = ({ location }) => {
  const history = useHistory();

  const requestPassword = useCallback(
    async (code) => {
      try {
        await fetchResetPassword(code);
        history.push('/login');
      } catch (err) {
        alert('오류가 발생하여 이전 페이지로 이동합니다.');
        history.goBack();
      }
    },
    [history],
  );

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query.code) history.goBack();
    else {
      requestPassword(query.code);
    }
  }, [location.search, history, requestPassword]);

  return (
    <Wrapper>
      <div> 패스워드 리셋 진행중...</div>
    </Wrapper>
  );
};

export default PwResetPage;
