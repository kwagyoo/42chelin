import QueryString from 'qs';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from '../common/Wrapper';

const PwResetPage = ({ location }) => {
  const history = useHistory();
  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query.code) history.goBack();
  }, [location.search, history]);

  return (
    <Wrapper>
      <div> 패스워드 리셋</div>
    </Wrapper>
  );
};

export default PwResetPage;
