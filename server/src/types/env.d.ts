declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;

      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;

      DATABASE_URL: string;
      MYSQL_ROOT_PASSWORD: string;
      REDIS_URL: string;

      EMAIL_ID: string;
      EMAIL_PASSWORD: string;

      JWT_SECRET_KEY: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;

      CLIENT_URL: string;
    }
  }
}

export {};
