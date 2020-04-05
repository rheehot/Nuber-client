import React from 'react';
import qs from 'qs';
import useRequest from '../../libs/hooks/useRequest';

import { useDispatch } from 'react-redux';
import { Location, History } from 'history';
import { useApolloClient } from '@apollo/react-hooks';

import {
  getRegisterToken,
  GetRegisterTokenResponse,
  localRegister,
  socialRegister,
  getSocialProfile,
  SocialProfile,
} from '../../libs/apis/auth';

import RegisterForm, {
  RegisterFormType,
} from '../../components/register/RegisterForm';

import { GET_CURRENT_USER } from '../../libs/graphql/user';
import { actions } from '../../modules/core';

type Query = { code?: string; social?: string; type?: 'email' | 'phone' };

interface RegisterFormContainerProps {
  location: Location;
  history: History;
}
const RegisterFormContainer: React.FC<RegisterFormContainerProps> = ({
  location,
  history,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) as Query;
  const client = useApolloClient();
  const dispatch = useDispatch();

  const [error, setError] = React.useState<string | null>(null);
  const [
    socialProfile,
    setSocialProfile,
  ] = React.useState<SocialProfile | null>(null);

  const [onGetRegisterToken, _, registerToken] = useRequest<
    GetRegisterTokenResponse
  >(getRegisterToken);

  const onGetSocialProfile = async () => {
    const profile = await getSocialProfile();
    setSocialProfile(profile);
  };

  React.useEffect(() => {
    if (!query.code) return;

    onGetRegisterToken(query.code, query.type);
  }, [onGetRegisterToken, query.code, query.type]);

  React.useEffect(() => {
    if (!query.social) return;
    onGetSocialProfile();
  }, [query.social]);

  const onSubmit = async (form: RegisterFormType) => {
    setError(null);
    const validation = {
      firstName: (text: string) => {
        if (text === '') {
          return '성을 입력하세요.';
        }
      },
      lastName: (text: string) => {
        if (text === '') {
          return '이름을 입력해주세요.';
        }
      },
      email: (text: string) => {
        if (text === '') {
          return '이메일을 입력해주세요.';
        }
      },
      phone: (text: string) => {
        if (text === '') {
          return '전화번호를 입력하세요.';
        }
      },
      birth: (text: string) => {
        if (text === '') {
          return '생일을 입력해주세요.';
        }
      },
      gender: (text: string) => {
        if (text === '') {
          return '성별을 입력해주세요.';
        }
      },
    };

    const error =
      validation.firstName(form.first_name) ||
      validation.lastName(form.last_name) ||
      validation.email(form.email) ||
      validation.phone(form.phone) ||
      validation.birth(form.birth) ||
      validation.gender(form.gender) ||
      null;

    if (error) {
      setError(error);
      return;
    }

    try {
      if (query.code) {
        await localRegister({
          type: query.type!,
          registerToken: registerToken && registerToken.register_token,
          form,
        });
      } else if (query.social) {
        await socialRegister(form);
      }
    } catch (e) {
      if (e.response.status === 409) {
        setError('이미 존재하는 아이디입니다.');
        return;
      }
      setError('에러 발생!');
      return;
    }

    try {
      await client.query({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });

      dispatch(actions.setLoggedStatus(true));
      history.replace('/');
    } catch (e) {
      setError('에러 발생!');
      dispatch(actions.setLoggedStatus(false));
      return;
    }
  };

  if (query.social && !socialProfile) return null;

  return (
    <RegisterForm
      error={error}
      onSubmit={onSubmit}
      fixedEmail={registerToken && registerToken.email}
      fixedPhone={registerToken && registerToken.phone}
    />
  );
};

export default RegisterFormContainer;
