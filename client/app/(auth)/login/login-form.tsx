"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PasswordInput, TextInput } from "@/app/components/input";
import { authService } from "@/app/utils/services";
import { useState } from "react";
import { AxiosError } from "axios";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.login(data);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        id="email"
        type="email"
        placeholder="Enter your email"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        id="password"
        placeholder="Enter your password"
        error={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      {error && (
        <p className="text-center text-white bg-warning p-2 rounded">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}
