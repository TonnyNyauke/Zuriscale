// src/app/(main)/campaigns/page.tsx
import { fetchCampaignData } from '@/app/lib/data';
import CampaignAnalytics from '@/components/campaigns/CampaignAnalytics';
import CampaignList from '@/components/campaigns/CampaignList';
import CreateCampaignButton from '@/components/campaigns/CreateCampaignButton';
import React from 'react';

export default async function CampaignsPage() {
  const { campaigns, analytics } = await fetchCampaignData();
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
        <CreateCampaignButton />
      </div>
      
      <CampaignAnalytics analytics={analytics} />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Campaigns</h2>
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  );
}