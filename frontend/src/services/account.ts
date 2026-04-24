import axios from "axios";
import api, { API_BASE_URL } from "./auth";
import type { User } from "../context/AuthContext";

interface LoginPaylod{
    identifier: string;
    password: string;
}

interface RegisterPayload{
    username: string;
    email: string;
    password: string;
}

interface ResendVerificationPayload {
    email: string;
}

interface ApiError {
    code: string;
    message: string;
    status: number;
}

interface ServiceResult<T> {
    data: T | null;
    error: ApiError | null;
}

interface AuthResponse {
    user: User;
    access_token: string;
}

interface RegistrationResponse {
    message: string;
    verification_required: boolean;
    email: string;
}

interface VerificationResponse {
    message: string;
    verified: boolean;
}

function parseError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        if (detail && typeof detail === 'object') {
            return {
                code: detail.code ?? 'request_failed',
                message: detail.message ?? 'Request failed',
                status: error.response?.status ?? 500,
            };
        }
        return {
            code: 'request_failed',
            message: error.response?.data?.detail ?? error.message,
            status: error.response?.status ?? 500,
        };
    }

    return {
        code: 'request_failed',
        message: 'Request failed',
        status: 500,
    };
}

const doLogin = async (data: LoginPaylod): Promise<ServiceResult<AuthResponse>>=>{
    try{
        const response = await api.post('/accounts/login', data)
        return { data: response.data, error: null }
    }catch(error){
        return { data: null, error: parseError(error) }
    }
}


export async function doRegister(data: RegisterPayload): Promise<ServiceResult<RegistrationResponse>>{
    try{
        const response = await api.post('/accounts/register', data)
        return { data: response.data, error: null }
    }catch(error){
        return { data: null, error: parseError(error) }
    }
}

export async function resendVerificationEmail(
    data: ResendVerificationPayload,
): Promise<ServiceResult<{ message: string; verification_required: boolean }>> {
    try {
        const response = await api.post('/accounts/resend-verification', data)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error: parseError(error) }
    }
}

export async function verifyEmailToken(token: string): Promise<ServiceResult<VerificationResponse>> {
    try {
        const response = await api.get(`/accounts/verify-email?token=${encodeURIComponent(token)}`)
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error: parseError(error) }
    }
}

export async function completeGoogleLogin(): Promise<ServiceResult<AuthResponse>> {
    try {
        const response = await api.post('/accounts/refresh', {})
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error: parseError(error) }
    }
}

export function beginGoogleLogin() {
    window.location.href = `${API_BASE_URL}/accounts/google/start`
}

export {doLogin}
