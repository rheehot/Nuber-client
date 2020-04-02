import React from 'react';
import qs from 'qs';
import { Location, History } from 'history';
import { useApolloClient } from '@apollo/react-hooks';
import useRequest from '../../libs/hooks/useRequest';
import {
  getRegisterToken,
  GetRegisterTokenResponse,
} from '../../libs/apis/auth';
import RegisterForm, {
  RegisterFormType,
} from '../../components/register/RegisterForm';
import { GET_CURRENT_USER } from '../../libs/graphql/user';

type Query = { code?: string; social?: string; type?: string };

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

  const [error, setError] = React.useState<string | null>(null);

  const [onGetRegisterToken, _, registerToken] = useRequest<
    GetRegisterTokenResponse
  >(getRegisterToken);

  React.useEffect(() => {
    if (!query.code) return;

    onGetRegisterToken(query.code, query.type);
  }, [onGetRegisterToken, query.code, query.type]);

  React.useEffect(() => {
    if (!query.social) return;
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
        if (text.length > 140) {
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
      } else if (query.social) {
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
      history.replace('/');
    } catch (e) {
      setError('에러 발생!');
      return;
    }
  };

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
