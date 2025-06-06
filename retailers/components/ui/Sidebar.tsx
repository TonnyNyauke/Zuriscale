import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Customers', href: '/customers', icon: '👥' },
    { name: 'Campaigns', href: '/campaigns', icon: '📢' },
  ];

  return (
    <div className="w-64 bg-[#004E89] text-white flex flex-col">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Zuriscale</h1>
        <p className="text-sm text-blue-200 mt-1">Fashion Retail Intelligence</p>
      </div>
      <nav className="flex-1 mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center px-6 py-3 hover:bg-blue-800 transition-colors">
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-5 border-t border-blue-800">
        <div className="text-sm">Retailer: Nairobi Fashion Hub</div>
      </div>
    </div>
  );
};

export default Sidebar;