'use client'

import React, { useState } from 'react';
import { z } from 'zod';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Mail, 
  Lock, 
  ArrowRight,
  Shield,
  Users,
  Clock,
  Star,
  TrendingUp,
  MessageSquare,
  Zap,
  CheckCircle,
  Smartphone
} from 'lucide-react';

// Zod validation schema
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function ZuriscaleLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof LoginFormData;
          formErrors[field] = err.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate login failure for demo
      if (loginAttempts < 2) {
        setLoginAttempts(prev => prev + 1);
        throw new Error('Invalid credentials');
      }
      
      // Success - redirect to dashboard
      console.log('Login successful! Redirecting to dashboard...');
      
    } catch (error) {
      if (loginAttempts >= 2) {
        setErrors({ 
          email: 'Too many failed attempts. Please reset your password or try again later.' 
        });
      } else {
        setErrors({ 
          email: 'Invalid email or password. Please check your credentials and try again.' 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail || !z.string().email().safeParse(forgotPasswordEmail).success) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResetEmailSent(true);
      setErrors({});
    } catch (error) {
      setErrors({ email: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setForgotPasswordEmail('');
    setErrors({});
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">Z</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Zuriscale</span>
            </div>

            {resetEmailSent ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to{' '}
                  <span className="font-semibold text-gray-800">{forgotPasswordEmail}</span>
                </p>
                <button
                  onClick={handleBackToLogin}
                  className="w-full py-3 px-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex">
      {/* Left Side - Value Proposition */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-teal-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl font-bold">Z</span>
            </div>
            <span className="text-2xl font-bold">Zuriscale</span>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome Back!
                <span className="block text-teal-200 text-2xl font-normal mt-2">
                  Continue Growing Your Fashion Business
                </span>
              </h1>
              <p className="text-xl text-teal-100 leading-relaxed">
                Your customers are waiting. Let's get you back to building that KES 1M revenue goal.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Your Business Growth Awaits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">24hrs</div>
                  <div className="text-xs text-teal-100">Avg. Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-300">95%</div>
                  <div className="text-xs text-teal-100">Customer Retention</div>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's New</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">New mobile app for on-the-go management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Enhanced analytics dashboard with profit insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Improved WhatsApp automation templates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-amber-300" />
            ))}
          </div>
          <blockquote className="text-sm font-medium mb-3">
            "Just logged in to see I hit KES 1.2M this month! Zuriscale's automation made it possible while I focused on sourcing new inventory."
          </blockquote>
          <cite className="text-teal-200 text-sm">
            - Margaret W., Boutique Owner, Kisumu
          </cite>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">Z</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Zuriscale</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">
              Sign in to your account to continue growing your business
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe || false}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-600">Remember me</label>
              </div>
              
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Phone Login Option */}
            <PhoneLoginSection 
              onSuccess={() => console.log('Phone login successful')}
            />
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => console.log('Navigate to signup')}
                className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
              >
                Create free account
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Join 500+ fashion retailers already growing with Zuriscale
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 text-emerald-500 mb-1" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-4 h-4 text-emerald-500 mb-1" />
                <span>500+ Happy Users</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-emerald-500 mb-1" />
                <span>24/6 Support</span>
              </div>
            </div>
          </div>

          {/* Mobile Success Metric */}
          <div className="lg:hidden mt-6 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
            <div className="text-center">
              <div className="text-lg font-bold text-teal-700 mb-1">Welcome Back!</div>
              <div className="text-sm text-teal-600">Your dashboard is ready with fresh insights</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Phone Login Component
function PhoneLoginSection({ onSuccess }: { onSuccess: () => void }) {
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!phoneNumber || !phoneNumber.match(/^07\d{8}$/)) {
      setError('Please enter a valid Kenyan phone number (07XXXXXXXX)');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPhoneLogin = () => {
    setShowPhoneLogin(false);
    setOtpSent(false);
    setPhoneNumber('');
    setOtpCode('');
    setError('');
  };

  if (!showPhoneLogin) {
    return (
      <button
        type="button"
        onClick={() => setShowPhoneLogin(true)}
        className="w-full py-3 px-4 border-2 border-gray-200 hover:border-teal-300 text-gray-700 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center space-x-2"
      >
        <Smartphone className="w-5 h-5" />
        <span>Sign in with Phone Number</span>
      </button>
    );
  }

  return (
    <div className="border-2 border-teal-100 rounded-xl p-6 bg-teal-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Phone Login</h3>
        <button
          onClick={resetPhoneLogin}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ✕
        </button>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 text-sm">
                +254
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="712 345 678"
                className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to<br />
              <span className="font-semibold">+254{phoneNumber}</span>
            </p>
          </div>

          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="w-full px-3 py-2 text-center text-lg font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 tracking-widest"
            maxLength={6}
          />

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setOtpSent(false)}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Back
            </button>
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otpCode.length !== 6}
              className="flex-1 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}