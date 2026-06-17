import Link from "next/link";
import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <LoginForm />

        <p className="mt-4 text-center">
          Don&apos;t have account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-semibold"
          >
            Create One
          </Link>
        </p>
      </div>
    </main>
  );
}
