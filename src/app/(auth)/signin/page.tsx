
"use client";

import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";







 const SigninForm = () => {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();



const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setError(null);
const { data, error } = await authClient.signIn.email({
    email: email,
    password: password,
    rememberMe: true,
    callbackURL: "/"
})
console.log(data);  
if (error) {
  setError(error.message ?? "Invalid email or password");
  return;
}
router.push("/");
router.refresh();
};

















  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-sky-50/60 px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-xl shadow-sky-100/50">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <LockKeyhole className="size-7" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </CardTitle>

            <CardDescription className="text-slate-500">
              Sign in to your account and continue where you left off.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignIn}>
            <FieldGroup className="gap-5">
              <Field>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full gap-3 rounded-xl border-sky-100 bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.05 13.22l7.98 6.19C11.96 13.72 17.48 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.43 37.95 46.98 31.83 46.98 24.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.03 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.52 0-12.04-4.22-13.97-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldSeparator className="[&_[data-slot=field-separator-content]]:bg-white">
                Or continue with email
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="email" className="text-slate-700">
                  Email address
                </FieldLabel>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-500" />

                  <Input
                    id="email"
                    type="email"
                    value={email}
            onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 rounded-xl border-sky-100 bg-white pl-10 text-slate-800 placeholder:text-slate-400 focus-visible:ring-sky-400"
                    required
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor="password" className="text-slate-700">
                    Password
                  </FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-sky-600 underline-offset-4 hover:text-sky-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                   value={password}
            onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 rounded-xl border-sky-100 bg-white text-slate-800 placeholder:text-slate-400 focus-visible:ring-sky-400"
                  required
                />
              </Field>

              <Field>
                {error && (
                  <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-sky-500 font-semibold text-white shadow-sm shadow-sky-200 transition-colors hover:bg-sky-600"
                >
                  Login
                </Button>

                <FieldDescription className="pt-2 text-center text-slate-500">
                  Dont have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-sky-600 underline-offset-4 hover:text-sky-700 hover:underline"
                  >
                    Create account
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


export default SigninForm;