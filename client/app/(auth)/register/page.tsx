import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Ghost Nodes</h1>

        <RegisterForm />

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
