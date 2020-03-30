import React from 'react';
import qs from 'qs';
import { Location, History } from 'history';
import useRequest from '../../libs/hooks/useRequest';
import {
  getRegisterToken,
  GetRegisterTokenResponse,
} from '../../libs/apis/auth';
import RegisterForm from '../../components/register/RegisterForm';

type Query = { code?: string; social?: string };

interface RegisterFormContainerProps {
  location: Location;
  history: History;
}
const RegisterFormContainer: React.FC<RegisterFormContainerProps> = ({
  location,
  history,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) as Query;
  const [error, setError] = React.useState<string | null>(null);

  const [onGetRegisterToken, , registerToken] = useRequest<
    GetRegisterTokenResponse
  >((code: string) => getRegisterToken(code));

  React.useEffect(() => {
    if (!query.code) return;

    onGetRegisterToken(query.code);
  }, [onGetRegisterToken, query.code]);

  React.useEffect(() => {
    if (!query.social) return;
  }, [query.social]);

  return <RegisterForm />;
};

export default RegisterFormContainer;
