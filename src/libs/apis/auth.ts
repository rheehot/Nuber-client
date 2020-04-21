import apiClient from './apiClient';

export type SendAuthPayloadResponse = { registerd: boolean };
export type GetRegisterTokenResponse = {
  payload: string;
  email: string;
  phone: string;
  register_token: string;
};

export type AuthResponse = {
  email: string;
  is_certified: boolean;
  username: string;
  id: string;
  created_at: string;
  updated_at: string;
  profile: {
    fk_user_id: string;
    first_name: string;
    last_name: string;
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    birth: string;
    thumbnail: string | null;
    car_name: string;
    car_number: string;
    id: string;
    created_at: string;
    updated_at: string;
    profile_links: any;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

export const sendAuthEmail = (email: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendmail', {
    email,
  });

export const sendAuthSMS = (phone: string, country_code: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendsms', {
    phone,
    country_code,
  });

export const getRegisterToken = (code: string, type: string) => {
  const url =
    type === 'email'
      ? `/api/v1.0/auth/mail-code/${code}`
      : `/api/v1.0/auth/sms-code/${code}`;
  return apiClient.get<GetRegisterTokenResponse>(url);
};

export const emailLoginCode = (code: string) =>
  apiClient.get<AuthResponse>(`/api/v1.0/auth/mail-code/${code}`);

export const localRegister = ({
  type,
  registerToken,
  form,
}: {
  type: 'email' | 'phone';
  registerToken: string | null;
  form: {
    email: string;
    phone: string;
    country_code: string;
    birth: string;
    first_name: string;
    last_name: string;
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  };
}) =>
  apiClient.post<AuthResponse>(`/api/v1.0/auth/register/${type}/local`, {
    register_token: registerToken,
    form,
  });

export const socialRegister = (form: {
  email: string;
  phone: string;
  country_code: string;
  birth: string;
  first_name: string;
  last_name: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
}) =>
  apiClient.post<AuthResponse>('/api/v1.0/auth/social/register', {
    form,
  });

export interface SocialProfile {
  uid: number;
  email: string;
  name: string;
  thumbnail: string;
  username: string;
}

export const getSocialProfile = async () => {
  const response = await apiClient.get<SocialProfile>(
    '/api/v1.0/auth/social/profile',
  );
  return response.data;
};
