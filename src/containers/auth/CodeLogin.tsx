import React from 'react';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Location, History } from 'history';
import { emailLoginCode } from '../../libs/apis/auth';
import { GET_CURRENT_USER, CurrentUser } from '../../libs/graphql/user';
import { NUBER_CLIENT_CURRENT_USER } from '../../libs/constants';
import { actions } from '../../modules/core';

interface CodeLoginProps {
  location: Location;
  history: History;
}
const CodeLogin: React.FC<CodeLoginProps> = ({ location, history }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const client = useApolloClient();
  const dispatch = useDispatch();
  const processLogin = React.useCallback(async () => {
    try {
      await emailLoginCode(query.code);
      const response = await client.query<{ auth: CurrentUser }>({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });

      const string = JSON.stringify(response.data.auth);
      localStorage.setItem(NUBER_CLIENT_CURRENT_USER, string);
      dispatch(actions.setLoggedStatus(true));
      history.replace('/');
    } catch (e) {
      // TODO: show 401
      toast.error('잘못된 접근입니다.');
      history.replace('/');
      dispatch(actions.setLoggedStatus(false));
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

  return null;
};

export default CodeLogin;
