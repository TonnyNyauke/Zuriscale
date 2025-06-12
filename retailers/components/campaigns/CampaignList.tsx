// src/components/campaigns/CampaignList.tsx
import React from 'react';
import CampaignCard from './CampaignCard';
import { Campaign } from '@/app/types/types';
interface CampaignListProps {
  campaigns: Campaign[];
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}