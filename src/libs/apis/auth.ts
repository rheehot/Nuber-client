import apiClient from './apiClient';

export type SendAuthPayloadResponse = { registered: boolean };

export const sendAuthEmail = (email: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendmail', {
    email,
  });

export const sendAuthSMS = (phone: string) =>
  apiClient.post<SendAuthPayloadResponse>('/api/v1.0/auth/sendsms', {
    phone,
  });

export const certificationCode = (code: string) =>
  apiClient.get(`/api/v1.0/auth/code/${code}`);
