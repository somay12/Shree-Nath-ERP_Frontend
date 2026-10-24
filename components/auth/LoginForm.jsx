"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Logo from "@/components/layout/Logo";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fc] lg:grid lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
      <aside className="hidden min-h-screen flex-col justify-between bg-gradient-to-br from-[#101a2d] to-[#192a49] px-10 py-9 text-slate-300 lg:flex xl:px-16 xl:py-12">
        <Logo dark />
        <div className="w-full max-w-xl py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">SHREE NATH · BUSINESS WORKSPACE</p>
          <h2 className="mt-5 max-w-lg text-[2.65rem] font-semibold leading-[1.1] tracking-tight text-white xl:text-5xl">
            Your workday,<br />all in one place.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
            Sign in to access the tools and information your team uses every day.
          </p>
          <div className="mt-8 h-px w-16 bg-blue-400/70" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[11px] text-slate-500">
          <span>SHREE NATH EXPORTS · ERP</span>
          <span>Authorized team members</span>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10 sm:px-8 lg:px-10 xl:px-16">
        <div className="w-full max-w-[452px]">
          <div className="relative overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_75px_-35px_rgba(15,23,42,0.3)] sm:p-9">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-700 to-sky-400" aria-hidden="true" />
            <div className="mb-8">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <Logo />
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1.5 text-[11px] font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secure sign-in
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">Shree Nath Exports access</p>
              <h1 className="mt-2 text-[1.8rem] font-semibold tracking-tight text-slate-950">Welcome Back</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to access your workspace.</p>
            </div>

            <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Username, email or phone number</span>
                <Input
                  type="text"
                  name="identifier"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="Enter username, email or phone number"
                  icon={UserRound}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    icon={LockKeyhole}
                    className="pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2 flex justify-end">
                  <button type="button" className="text-sm font-medium text-blue-700 underline-offset-4 hover:text-blue-900 hover:underline">
                    Forgot password?
                  </button>
                </div>
              </label>
              <Button type="submit" size="lg" className="mt-1 h-12 w-full bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-600">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
