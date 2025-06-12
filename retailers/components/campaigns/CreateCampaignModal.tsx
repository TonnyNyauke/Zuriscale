//components/campaigns/CreateCampaignModal.tsx
'use client';

import React, { useState } from 'react';
import { useEnergy } from '../ui/EnergyProvider';

interface CreateCampaignModalProps {
  onClose: () => void;
}

export default function CreateCampaignModal({ onClose }: CreateCampaignModalProps) {
  const [campaign, setCampaign] = useState({
    name: '',
    type: 'whatsapp' as 'whatsapp' | 'sms' | 'instagram' | 'facebook',
    message: '',
    criteria: {
      min_orders: 0,
      last_purchase_days: 30,
      tags: [] as string[],
    },
    schedule: 'now' as 'now' | 'later',
    scheduledDate: '',
    scheduledTime: '',
  });
  
  const { energyMode } = useEnergy();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating campaign:', campaign);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-2xl rounded-xl overflow-hidden ${
        energyMode ? 'bg-gradient-to-b from-[#F8F9FA] to-[#E6F7FF]' : 'bg-white'
      }`}>
        <div className={`p-6 ${
          energyMode ? 'bg-gradient-to-r from-[#004E89] to-[#002D54] text-white' : 'bg-gray-50'
        }`}>
          <h2 className="text-xl font-bold">Create New Campaign</h2>
          <p className="mt-1">Re-engage your customers with targeted messages</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaign.name}
              onChange={(e) => setCampaign({...campaign, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Summer Discounts"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['whatsapp', 'sms', 'instagram', 'facebook'] as const).map(channel => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => setCampaign({...campaign, type: channel})}
                  className={`p-3 border rounded-lg flex flex-col items-center ${
                    campaign.type === channel
                      ? energyMode
                        ? 'border-[#FF6B35] bg-orange-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-xl mb-1">
                    {channel === 'whatsapp' ? '💬' : 
                     channel === 'sms' ? '📱' : 
                     channel === 'instagram' ? '📸' : '👍'}
                  </span>
                  <span className="text-xs capitalize">{channel}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Criteria
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600"
                  checked={campaign.criteria.min_orders > 0}
                  onChange={(e) => setCampaign({
                    ...campaign, 
                    criteria: {
                      ...campaign.criteria,
                      min_orders: e.target.checked ? 1 : 0
                    }
                  })}
                />
                <span>Minimum orders:</span>
                {campaign.criteria.min_orders > 0 && (
                  <input
                    type="number"
                    value={campaign.criteria.min_orders}
                    onChange={(e) => setCampaign({
                      ...campaign, 
                      criteria: {
                        ...campaign.criteria,
                        min_orders: parseInt(e.target.value) || 0
                      }
                    })}
                    className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded"
                    min="1"
                  />
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600"
                  checked={campaign.criteria.last_purchase_days > 0}
                  onChange={(e) => setCampaign({
                    ...campaign, 
                    criteria: {
                      ...campaign.criteria,
                      last_purchase_days: e.target.checked ? 30 : 0
                    }
                  })}
                />
                <span>Last purchase within:</span>
                {campaign.criteria.last_purchase_days > 0 && (
                  <input
                    type="number"
                    value={campaign.criteria.last_purchase_days}
                    onChange={(e) => setCampaign({
                      ...campaign, 
                      criteria: {
                        ...campaign.criteria,
                        last_purchase_days: parseInt(e.target.value) || 0
                      }
                    })}
                    className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded"
                    min="1"
                  />
                )}
                <span className="ml-1">days</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message Content
            </label>
            <textarea
              value={campaign.message}
              onChange={(e) => setCampaign({...campaign, message: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your message here..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {campaign.message.length}/1024 characters
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="schedule"
                  checked={campaign.schedule === 'now'}
                  onChange={() => setCampaign({...campaign, schedule: 'now'})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Send now</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="schedule"
                  checked={campaign.schedule === 'later'}
                  onChange={() => setCampaign({...campaign, schedule: 'later'})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Schedule for later</span>
              </label>
            </div>
            
            {campaign.schedule === 'later' && (
              <div className="mt-2 flex space-x-2">
                <input
                  type="date"
                  value={campaign.scheduledDate}
                  onChange={(e) => setCampaign({...campaign, scheduledDate: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  value={campaign.scheduledTime}
                  onChange={(e) => setCampaign({...campaign, scheduledTime: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg font-medium ${
                energyMode
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF9E58] text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}