import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
if (!baseURL) throw new Error("baseURL is undefined");

const client = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    if (err.response && err.response.status == 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return new Promise(() => {});
    }

    return Promise.reject(err);
  },
);

export { client };
