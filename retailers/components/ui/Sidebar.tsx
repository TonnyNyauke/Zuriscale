'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  Megaphone,
  Bell,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User as SupabaseUser } from '@supabase/supabase-js';

const supabase = createClient();

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndBusiness = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          return;
        }

        if (!session?.user) {
          console.log('No session found, redirecting to login');
          router.push('/login');
          return;
        }

        setUser(session.user);
        console.log('User ID:', session.user.id);

        // Fetch business name
        const { data: retailerData, error: retailerError } = await supabase
          .from('retailers')
          .select('business_name')
          .eq('retailer_id', session.user.id)
          .single();

        if (retailerError) {
          console.error('Error fetching retailer data:', retailerError);
          // Don't return here, just log the error
        } else if (retailerData) {
          setBusinessName(retailerData.business_name);
        }

      } catch (error) {
        console.error('Error in fetchUserAndBusiness:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndBusiness();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          setBusinessName('');
          router.push('/login');
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Fetch business name for the new session
          const { data: retailerData, error } = await supabase
            .from('retailers')
            .select('business_name')
            .eq('retailer_id', session.user.id)
            .single();

          if (retailerData && !error) {
            setBusinessName(retailerData.business_name);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]); 

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'WhatsApp Inbox', href: '/inbox', icon: MessageCircle },
    { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">Zuriscale</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <User size={20} />
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">Zuriscale</h1>
          <p className="text-sm text-gray-500 mt-1">Fashion Retail Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 ">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="flex items-center px-3 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                  >
                    <IconComponent size={20} className="mr-3 text-gray-500 group-hover:text-gray-700" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell size={18} className="mr-2" />
              <span className="text-sm font-medium">Notifications</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <User size={18} />
            </button>
          </div>
          
          <div className="text-xs text-gray-500 mb-3 px-3">
            Retailer: {businessName || 'Loading...'}
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/20" onClick={toggleMobileMenu}></div>
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Zuriscale</h1>
                  <p className="text-sm text-gray-500 mt-1">Fashion Retail Intelligence</p>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        onClick={toggleMobileMenu}
                        className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      >
                        <IconComponent size={20} className="mr-3 text-gray-500" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-4 px-3">
                Retailer: {businessName || 'Loading...'}
              </div>
              
              <button 
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mb-2"
              >
                <LogOut size={16} className="mr-2" />
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-gray-900 transition-colors min-w-0"
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-xs font-medium truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;