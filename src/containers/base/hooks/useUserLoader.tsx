import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CURRENT_USER, CurrentUser } from '../../../libs/graphql/user';
import { RootState } from '../../../modules';
import { ssrEnabled } from '../../../libs/utils';
import { actions } from '../../../modules/core';
import { NUBER_CLIENT_CURRENT_USER } from '../../../libs/constants';

const useUserLoader = () => {
  const dispatch = useDispatch();
  const getCurrentUser = useQuery<{ auth: CurrentUser }>(GET_CURRENT_USER);
  const prevUser = useSelector((state: RootState) => state.core.user);

  const user = getCurrentUser.data ? getCurrentUser.data.auth : undefined;
  if (ssrEnabled && user) {
    dispatch(actions.setUser(user));
    dispatch(actions.setLoggedStatus(true));
  }

  useEffect(() => {
    if (user === undefined) return () => {};
    if (prevUser !== user) {
      const userData = JSON.stringify(user);
      localStorage.setItem(NUBER_CLIENT_CURRENT_USER, userData);
      dispatch(actions.setUser(user));
      dispatch(actions.setLoggedStatus(true));
    }
  }, [dispatch, prevUser, user]);
};

export default useUserLoader;
