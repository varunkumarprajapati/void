import { client } from "./axiosClient";
import ENDPOINTS from "./endpoints";

interface ILoginPayload {
  email: string;
  password: string;
}

interface IRegisterPayload {
  email: string;
  password: string;
}

interface IVerifyOTPPayload {
  email: string;
  otp: number;
}

class AuthService {
  login = async (payload: ILoginPayload) => {
    await client.post(ENDPOINTS.AUTH.LOGIN.URL, payload);
  };

  register = async (payload: IRegisterPayload) => {
    await client.post(ENDPOINTS.AUTH.REGISTER.URL, payload);
  };

  verifyOTP = async (payload: IVerifyOTPPayload) => {
    await client.post(ENDPOINTS.AUTH.VERIFY_OTP.URL, payload);
  };

  getMe = async () => {
    const response = await client.get(ENDPOINTS.AUTH.ME.URL);
    return response.data;
  };
}

const authService = new AuthService();

export { authService };
