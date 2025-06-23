// src/app/login/page.tsx
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#004E89] to-[#002D54] flex flex-col justify-between p-8 text-white">
        <div>
          <h1 className="text-3xl font-bold">Zuriscale</h1>
          <p className="mt-2">Fashion Retail Intelligence</p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Grow Your Fashion Business</h2>
          <p className="mt-4 max-w-md">
            Kenyan fashion retailers are increasing sales by 35% using our customer retention and analytics tools.
          </p>
          
          <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
            <div className="flex items-start">
              <div className="text-5xl mr-3">“</div>
              <p>
                Zuriscale helped us reduce customer churn by 40% and increase repeat sales 
                through targeted WhatsApp campaigns.
              </p>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed mr-3" />
              <div>
                <p className="font-medium">Sarah Kimani</p>
                <p className="text-sm opacity-80">Nairobi Fashion Boutique</p>
              </div>
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#FF6B35] hover:underline">
                Sign up
              </a>
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center">
            <a href="/forgot-password" className="text-sm text-[#FF6B35] hover:underline">
              Forgot your password?
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <button className="w-full py-2.5 border border-gray-300 rounded-lg flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5 mr-2" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}