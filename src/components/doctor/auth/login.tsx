'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/5">
          <Image
            src="/images/dclog.png"
            alt="Doctor consulting with patient"
            fill
            className="object-cover"
            priority
          />
        </div>
       

        <div className="absolute bottom-10 left-10 max-w-md rounded-lg bg-white/40  p-6 backdrop-blur">
          <p className="text-xl font-medium text-gray-900">
          Access your account to manage patient requests and consultations
          </p>
          <div className="w-4 h-28 left-0 top-0 absolute bg-[#004ba8]" />
        </div>

      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.jpg"
              alt="Quantum Doctor Logo"
              width={150}
              height={40}
              className="mb-8"
            />
            <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {/* Implement Google Sign In */}}
          >
            <Image
              src="/images/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign Up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or Manually</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                required
                className="w-full"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#004ba8]">
              Sign in
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            New Here?{' '}
            <Link href="/create-account" className="font-medium text-[#004ba8] hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

