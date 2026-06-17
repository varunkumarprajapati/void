"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, PasswordInput } from "@/app/components/input";
import { authService } from "@/app/utils/services";
import Button from "@/app/components/Button";

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const otpSchema = yup.object({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;
type OTPFormData = yup.InferType<typeof otpSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();

  // Step 1: Register form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1, isSubmitting: isSubmittingStep1 },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  // Step 2: OTP form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2, isSubmitting: isSubmittingStep2 },
  } = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
  });

  const onSubmitStep1 = async (data: RegisterFormData) => {
    try {
      setError(undefined);
      await authService.register(data);
      setEmail(data.email);
      setStep(2);
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  const onSubmitStep2 = async (data: OTPFormData) => {
    try {
      setError(undefined);
      await authService.verifyOTP({
        email,
        otp: Number(data.otp),
      });
      router.push("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      {/* Step 1: Register */}
      {step === 1 && (
        <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-4">
          <div>
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              autoCapitalize="none"
              autoComplete="email"
              error={!!errorsStep1.email}
              errorMessage={errorsStep1.email?.message}
              {...registerStep1("email")}
            />
          </div>

          <div>
            <PasswordInput
              id="password"
              placeholder="Create a password"
              error={!!errorsStep1.password}
              errorMessage={errorsStep1.password?.message}
              {...registerStep1("password")}
            />
          </div>

          {error && (
            <p className="text-center text-white bg-warning p-2 rounded">
              {error}
            </p>
          )}

          <Button type="submit" loading={isSubmittingStep1}>
            Continue to OTP Verification
          </Button>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              An 6-Digits OTP has been sent to <strong>{email}</strong>
            </p>
          </div>

          <div>
            <TextInput
              id="otp"
              type="number"
              placeholder="000000"
              className="text-center font-semibold"
              maxLength={6}
              inputMode="numeric"
              error={!!errorsStep2.otp}
              errorMessage={errorsStep2.otp?.message}
              {...registerStep2("otp")}
            />
          </div>

          {error && (
            <p className="text-center text-white bg-warning p-2 rounded">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setStep(1);
                setError(undefined);
              }}
              variant="outline"
              type="reset"
            >
              Back
            </Button>
            <Button
              type="submit"
              loading={isSubmittingStep2}
              className="flex-1"
            >
              Verify OTP
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
