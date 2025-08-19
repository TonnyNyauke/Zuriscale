import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // Check if user has access to Pro tier
  if (!session?.user?.subscriptionTier || session.user.subscriptionTier === 'basic' || session.user.subscriptionTier === 'standard') {
    redirect('/upgrade?tier=pro');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pro tier specific header/navigation can go here */}
      {children}
    </div>
  );
}
