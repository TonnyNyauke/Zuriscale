//components/campaigns/CampaignAnalytics.tsx
'use client'
import React from 'react';
import { useEnergy } from '../ui/EnergyProvider';


interface CampaignAnalyticsProps {
  analytics: {
    total_campaigns: number;
    successful_rate: number;
    avg_engagement: number;
    channel_distribution: {
      whatsapp: number;
      sms: number;
      instagram: number;
      facebook: number;
    };
  };
}

export default function CampaignAnalytics({ analytics }: CampaignAnalyticsProps) {
  const { energyMode } = useEnergy();
  
  const channelColors = {
    whatsapp: energyMode ? '#25D366' : '#128C7E',
    sms: energyMode ? '#FFD700' : '#CCAC00',
    instagram: energyMode ? '#E1306C' : '#C13584',
    facebook: energyMode ? '#4267B2' : '#3B5998',
  };
  
  return (
    <div className={`p-5 rounded-xl ${
      energyMode 
        ? 'bg-gradient-to-br from-[#E6F7FF] to-[#F0FFF4] border border-[#00C49A]/30' 
        : 'bg-white border border-gray-200'
    }`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Performance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Campaigns</p>
          <p className="text-2xl font-bold">{analytics.total_campaigns}</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Success Rate</p>
          <p className="text-2xl font-bold text-green-600">
            {analytics.successful_rate}%
          </p>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Avg. Engagement</p>
          <p className="text-2xl font-bold text-blue-600">
            {analytics.avg_engagement}%
          </p>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Channel Distribution</p>
          <div className="flex justify-between">
            {Object.entries(analytics.channel_distribution).map(([channel, value]) => (
              <div key={channel} className="text-center">
                <div className="text-xs mb-1 capitalize">{channel}</div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: channelColors[channel as keyof typeof channelColors] }}
                >
                  {value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}