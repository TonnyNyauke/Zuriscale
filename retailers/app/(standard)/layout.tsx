import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // Check if user has access to Standard tier
  if (!session?.user?.subscriptionTier || session.user.subscriptionTier === 'basic') {
    redirect('/upgrade?tier=standard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standard tier specific header/navigation can go here */}
      {children}
    </div>
  );
}
