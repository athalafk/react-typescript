import apiClient from './axiosConfig';
import { LoginCredentials, LoginResponse } from 'src/types';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    return data;
};

export const logoutUser = async (): Promise<void> => {
    await apiClient.post('/api/auth/logout'); 
};