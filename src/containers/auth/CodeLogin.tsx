import React from 'react';
import qs from 'qs';
import { toast } from 'react-toastify';
import { Location, History } from 'history';
import { certificationCode } from '../../libs/apis/auth';

interface CodeLoginProps {
  location: Location;
  history: History;
}
const CodeLogin: React.FC<CodeLoginProps> = ({ location, history }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const processLogin = React.useCallback(async () => {
    try {
      await certificationCode(query.code);
      history.replace('/');
    } catch (e) {
      // TODO: show 401
      toast.error('잘못된 접근입니다.');
      history.replace('/');
    }
  }, [history, query.code]);
  React.useEffect(() => {
    if (!query.code) {
      // TODO: show 404
      toast.error('잘못된 접근입니다.');
      history.replace('/');
      return;
    }
    processLogin();
  }, [history, location.search, query.code, processLogin]);
  console.log(query);

  return null;
};

export default CodeLogin;
