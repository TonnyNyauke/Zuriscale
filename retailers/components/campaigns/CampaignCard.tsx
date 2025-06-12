//components/campaigns/CampaignCard.tsx
'use client'
import React from 'react';
import { format } from 'date-fns';
import { Campaign } from '@/app/types/types';
import { useEnergy } from '../ui/EnergyProvider';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const { energyMode } = useEnergy();
  
  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sent: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };
  
  const typeIcons = {
    whatsapp: '💬',
    sms: '📱',
    instagram: '📸',
    facebook: '👍',
  };
  
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      energyMode ? 'hover:shadow-lg hover:border-[#FF6B35]' : 'hover:shadow'
    }`}>
      <div className={`p-4 ${
        energyMode 
          ? 'bg-gradient-to-r from-[#004E89] to-[#002D54] text-white' 
          : 'bg-gray-50'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <span className="text-xl mr-2">{typeIcons[campaign.type]}</span>
              <h3 className="font-bold">{campaign.name}</h3>
            </div>
            <p className="text-sm opacity-80 mt-1">
              {campaign.target_count} recipients
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            statusColors[campaign.status]
          }`}>
            {campaign.status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4 line-clamp-2">
          {campaign.message}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-sm">
              {format(new Date(campaign.created_at), 'dd MMM yyyy')}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500">Engagement</p>
            <p className={`text-sm font-medium ${
              campaign.open_rate > 30 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {campaign.open_rate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}