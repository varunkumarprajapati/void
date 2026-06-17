const ENDPOINTS = {
  AUTH: {
    LOGIN: {
      URL: "/auth/login",
      METHOD: "POST",
    },
    REGISTER: {
      URL: "/auth/register",
      METHOD: "POST",
    },
    VERIFY_OTP: {
      URL: "/auth/verify-otp",
      METHOD: "POST",
    },
  },
  USER: {
    ME: {
      URL: "/users/me",
      METHOD: "GET",
    },
  },
};

export default ENDPOINTS;
