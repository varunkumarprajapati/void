declare global {
  interface AuthRegisterDTO {
    email: string;
    password: string;
  }

  interface AuthVerifyOtpDTO {
    email: string;
    otp: number;
  }
}

export {};
