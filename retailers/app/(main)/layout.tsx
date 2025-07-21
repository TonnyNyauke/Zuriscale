import { EnergyProvider } from '@/components/ui/EnergyProvider';
import Sidebar from '@/components/ui/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <EnergyProvider>
        {/* Desktop Layout */}
        <div className="hidden md:flex h-full">
          {/* Sticky Sidebar */}
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex flex-col flex-1 min-w-0">
            <main className="overflow-y-auto">
              {children}
            </main>
            <footer className="py-3 px-6 text-center text-sm text-gray-600 border-t bg-white flex-shrink-0">
              <p>© {new Date().getFullYear()} Zuriscale</p>
            </footer>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col">
          {/* Sticky Topbar */}
          <div className="sticky top-0 z-10">
            <Sidebar />
          </div>
          
          {/* Scrollable Content Area */}
          <main className="overflow-y-auto">
            {children}
          </main>
          <footer className="py-2 px-4 text-center text-xs text-gray-600 border-t bg-white flex-shrink-0">
            <p>© {new Date().getFullYear()} Zuriscale</p>
          </footer>
        </div>
      </EnergyProvider>
    </div>
  );
}