'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import adminService from '@/services/admin';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await adminService.adminLogin({ email, password });
    
    if (result.success) {
      localStorage.setItem('admin_token', result.data.access_token);
      if (result.data.refresh_token) {
        localStorage.setItem('admin_refresh_token', result.data.refresh_token);
      }
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/5">
          <Image
            src="/images/admin-login.jpg"
            alt="Admin login"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-10 left-10 max-w-md rounded-lg bg-white/40 p-6 backdrop-blur">
          <p className="text-xl font-medium text-gray-900">
            Access your admin dashboard to manage doctors and users
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
            <h1 className="text-2xl font-semibold text-gray-900">Admin Sign In</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#004ba8]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
