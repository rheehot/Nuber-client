import apiClient from './apiClient';

export type SendAuthPayloadResponse = { registered: boolean };
export type GetRegisterTokenResponse = {
  payload: string;
  register_token: string;
};

export type AuthResponse = {
  email: string;
  is_certified: boolean;
  username: string;
  id: string;
  created_at: string;
  updated_at: string;
  profile: any;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

export const sendAuthEmail = (email: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendmail', {
    email,
  });

export const sendAuthSMS = (phone: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendsms', {
    phone,
  });

export const getRegisterToken = (code: string) =>
  apiClient.get<GetRegisterTokenResponse>(`/api/v1.0/auth/code/${code}`);

export const certificationCode = (code: string) =>
  apiClient.get<AuthResponse>(`/api/v1.0/auth/code/${code}`);
