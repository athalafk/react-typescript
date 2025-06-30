import axios from 'axios';
import { LoginCredentials, LoginResponse } from '@/types';

const API_LOGIN_URL = "https://freshtrack.azurewebsites.net/api/auth/login";
const API_LOGOUT_URL = "https://freshtrack.azurewebsites.net/api/auth/logout";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>(API_LOGIN_URL, credentials);
    return data;
};


export const logoutUser = async (): Promise<void> => {
    const accessToken = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type");
    await axios.post(API_LOGOUT_URL, {}, {
        headers: {
            Authorization: `${tokenType} ${accessToken}`
    }
});
};