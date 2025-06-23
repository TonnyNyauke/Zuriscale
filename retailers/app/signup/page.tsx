// src/app/signup/page.tsx
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#004E89] to-[#002D54] flex flex-col justify-between p-8 text-white">
        <div>
          <h1 className="text-3xl font-bold">Zuriscale</h1>
          <p className="mt-2">Fashion Retail Intelligence</p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Transform Your Fashion Business</h2>
          <p className="mt-4 max-w-md">
            Join Kenyan fashion retailers who are boosting sales with our powerful analytics and customer retention tools.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">✓</div>
              <span>Customer retention analytics</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">✓</div>
              <span>WhatsApp marketing campaigns</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">✓</div>
              <span>Inventory management</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Zuriscale. Made for Kenyan fashion retailers.
          </p>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-[#FF6B35] hover:underline">
                Sign in
              </a>
            </p>
          </div>
          
          <SignupForm />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}