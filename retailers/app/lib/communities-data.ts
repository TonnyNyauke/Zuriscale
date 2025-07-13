// lib/communities-data.ts
import { Share2, MessageCircle, Camera, Briefcase, Hash } from 'lucide-react';

export interface Community {
  id: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  description: string;
  platform: string;
  members: string;
  link: string;
  color: string;
  bgColor: string;
}

export const communitiesData: Community[] = [
  {
    id: 'facebook-group',
    icon: Share2,
    title: 'Facebook Group',
    description: 'Join our private community of fashion retailers sharing insights, tips, and success stories about customer retention strategies.',
    platform: 'Facebook',
    members: '2,400+',
    link: 'https://facebook.com/groups/zuriscale-retailers',
    color: 'bg-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'facebook-page',
    icon: MessageCircle,
    title: 'Facebook Page',
    description: 'Follow our official page for the latest updates, feature announcements, and customer retention insights for fashion businesses.',
    platform: 'Facebook',
    members: '8,500+',
    link: 'https://facebook.com/zuriscale',
    color: 'bg-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'instagram',
    icon: Camera,
    title: 'Instagram',
    description: 'Get inspired by success stories, behind-the-scenes content, and quick tips to boost your fashion retail business.',
    platform: 'Instagram',
    members: '5,200+',
    link: 'https://instagram.com/zuriscale',
    color: 'bg-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'linkedin',
    icon: Briefcase,
    title: 'LinkedIn',
    description: 'Connect with fellow fashion industry professionals and stay updated on business growth strategies and market insights.',
    platform: 'LinkedIn',
    members: '3,100+',
    link: 'https://linkedin.com/company/zuriscale',
    color: 'bg-blue-700',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'discord',
    icon: Hash,
    title: 'Discord Server',
    description: 'Real-time chat with the Zuriscale team and community. Get instant support, share ideas, and network with other retailers.',
    platform: 'Discord',
    members: '1,800+',
    link: 'https://discord.gg/zuriscale',
    color: 'bg-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

export const communityMetadata = {
  title: 'Join Our Communities | Zuriscale',
  description: 'Connect with fellow fashion retailers in our vibrant communities. Share insights, get support, and grow your business with Zuriscale\'s customer retention platform.',
  keywords: 'fashion retail community, customer retention, business networking, fashion retailers Kenya, retail growth, customer engagement',
  openGraph: {
    title: 'Join Our Communities | Zuriscale',
    description: 'Connect with fellow fashion retailers in our vibrant communities. Share insights, get support, and grow your business.',
    type: 'website',
    url: 'https://zuriscale.com/communities',
    images: [
      {
        url: 'https://zuriscale.com/images/communities-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Zuriscale Communities - Connect with Fashion Retailers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Communities | Zuriscale',
    description: 'Connect with fellow fashion retailers in our vibrant communities. Share insights, get support, and grow your business.',
    images: ['https://zuriscale.com/images/communities-twitter.jpg']
  }
};