// BundleProgress.tsx
import React from 'react';

interface UsageData {
  whatsapp_used: number;
  whatsapp_total: number;
  sms_used: number;
  sms_total: number;
}

interface BundleProgressProps {
  usage: UsageData;
}

export default function BundleProgress({ usage }: BundleProgressProps) {
  const whatsappPercentage = (usage.whatsapp_used / usage.whatsapp_total) * 100;
  const smsPercentage = (usage.sms_used / usage.sms_total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Usage</h3>
      
      <div className="space-y-6">
        {/* WhatsApp Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">WhatsApp Messages</span>
            <span className="text-sm text-gray-500">
              {usage.whatsapp_used.toLocaleString()} / {usage.whatsapp_total.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(whatsappPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {Math.max(0, usage.whatsapp_total - usage.whatsapp_used).toLocaleString()} messages remaining
          </p>
        </div>

        {/* SMS Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">SMS Messages</span>
            <span className="text-sm text-gray-500">
              {usage.sms_used.toLocaleString()} / {usage.sms_total.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(smsPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {Math.max(0, usage.sms_total - usage.sms_used).toLocaleString()} messages remaining
          </p>
        </div>
      </div>
    </div>
  );
}