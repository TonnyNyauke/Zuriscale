'use client'

import React, { useState } from 'react';
import { z } from 'zod';
import { Check, ArrowRight, ArrowLeft, Sparkles, Shield, Clock, Users, Eye, EyeOff, AlertCircle, Star, Phone, User, Lock, Zap, TrendingUp, MessageSquare } from 'lucide-react';

// Zod validation schemas for each step
const step1Schema = z.object({
  businessName: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(50, 'Business name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Business name can only contain letters, spaces, hyphens and apostrophes'),
});

const step2Schema = z.object({
  phone: z.string()
    .regex(/^07\d{8}$/, 'Please enter a valid Kenyan phone number (07XXXXXXXX)'),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
});

const step3Schema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to our terms and conditions')
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type SignupFormData = z.infer<typeof fullSchema>;

export default function ZuriscaleSignup() {
  const [formData, setFormData] = useState<SignupFormData>({
    businessName: '',
    phone: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateCurrentStep = () => {
    const schemas = [step1Schema, step2Schema, step3Schema];
    const currentSchema = schemas[currentStep - 1];
    
    try {
      currentSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const stepErrors: Partial<Record<keyof SignupFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof SignupFormData;
          stepErrors[field] = err.message;
        });
        setErrors(stepErrors);
      }
      return false;
    }
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep === 2) {
      // Send OTP when moving from step 2 to 3
      setIsVerifying(true);
      try {
        // Simulate OTP sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setShowOtpInput(true);
      } catch (error) {
        setErrors({ phone: 'Failed to send verification code. Please try again.' });
      } finally {
        setIsVerifying(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      setErrors({ phone: 'Please enter the 6-digit verification code' });
      return;
    }
    
    setIsVerifying(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(3);
      setShowOtpInput(false);
      setErrors({});
    } catch (error) {
      setErrors({ phone: 'Invalid verification code. Please try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) return;
    
    try {
      fullSchema.parse(formData);
      setIsLoading(true);
      
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to onboarding
      console.log('Account created successfully! Redirecting to onboarding...');
      
    } catch (error) {
      setErrors({ password: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (showOtpInput) {
      setShowOtpInput(false);
      setOtpCode('');
      setErrors({});
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepTitles = [
    'Tell us about your business',
    'Your contact information', 
    'Secure your account'
  ];

  const stepIcons = [User, Phone, Lock];

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
                Reach KES 1M in Sales
                <span className="block text-teal-200">This Year</span>
              </h1>
              <p className="text-xl text-teal-100 leading-relaxed">
                Join 500+ Kenyan fashion retailers who transformed their businesses with automated WhatsApp customer retention.
              </p>
            </div>

            {/* Success Metrics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">180%</div>
                  <div className="text-sm text-teal-100">Average Revenue Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">12 Months</div>
                  <div className="text-sm text-teal-100">Average Time to KES 1M</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-lg">Automated WhatsApp follow-ups bring customers back</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-lg">Customer analytics show what sells best</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-lg">Pay-as-you-use pricing starts at KES 1.5/message</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-amber-300" />
            ))}
          </div>
          <blockquote className="text-lg font-medium mb-3">
            "I went from KES 45,000 to KES 120,000 monthly sales in just 6 months using Zuriscale. The WhatsApp automation is incredible!"
          </blockquote>
          <cite className="text-teal-200 font-medium">
            - Grace K., Fashion Boutique Owner, Nakuru
          </cite>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">Z</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Zuriscale</span>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => {
                const Icon = stepIcons[step - 1];
                const isActive = step === currentStep;
                const isCompleted = step < currentStep || (step === 2 && currentStep === 3);
                
                return (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : isActive 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                        step < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {stepTitles[currentStep - 1]}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Step {currentStep} of 3
            </p>
          </div>

          {/* OTP Verification Modal */}
          {showOtpInput && (
            <div className="mb-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
              <div className="text-center mb-4">
                <Phone className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800">Verify Your Phone</h3>
                <p className="text-gray-600 text-sm">
                  We sent a 6-digit code to +254{formData.phone}
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 tracking-widest"
                  maxLength={6}
                />
                
                {errors.phone && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || otpCode.length !== 6}
                    className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!showOtpInput && (
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              <div className="space-y-6">
                {/* Step 1: Business Info */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        What's your business name? *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="e.g. Grace's Fashion Hub"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
                          errors.businessName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.businessName && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.businessName}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">Your Goal: KES 1M in Sales</p>
                          <p className="text-xs text-amber-700 mt-1">
                            The average Zuriscale user reaches this milestone in 12 months with our customer retention system.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Info */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="flex">
                        <div className="flex items-center justify-center px-4 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 font-medium">
                          +254
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="712 345 678"
                          className={`w-full px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        We'll send a verification code to this number
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="grace@yourstore.com"
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
                  </div>
                )}

                {/* Step 3: Password & Terms */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Create Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="At least 8 characters"
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-colors ${
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

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label className="text-sm text-gray-600">
                        I agree to Zuriscale's{' '}
                        <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.agreeToTerms}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-3 pt-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-2" />
                      Back
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading || isVerifying}
                    className={`py-3 px-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl ${
                      currentStep === 1 ? 'w-full' : 'flex-1'
                    }`}
                  >
                    {isLoading ? (
                      'Creating Account...'
                    ) : isVerifying ? (
                      'Sending Code...'
                    ) : currentStep === 3 ? (
                      'Create Account'
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
              <div className="flex flex-col items-center">
                <Shield className="w-4 h-4 text-emerald-500 mb-1" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-4 h-4 text-emerald-500 mb-1" />
                <span>500+ Retailers</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-emerald-500 mb-1" />
                <span>24/6 Support</span>
              </div>
            </div>
          </div>

          {/* Mobile Value Prop */}
          <div className="lg:hidden mt-8 p-4 bg-teal-50 rounded-xl border border-teal-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-700 mb-1">KES 1M Goal</div>
              <div className="text-sm text-teal-600">Average time: 8 months with Zuriscale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}