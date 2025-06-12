// src/app/(main)/layout.tsx
import { EnergyProvider } from '@/components/ui/EnergyProvider';
import Sidebar from '@/components/ui/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="h-full bg-gray-50">
        <EnergyProvider>
          {/* Desktop: Traditional sidebar layout, Mobile: Overlay + bottom nav */}
          <div className="hidden md:flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
              <footer className="py-3 px-6 text-center text-sm text-gray-600 border-t bg-white">
                <p>© {new Date().getFullYear()} Zuriscale</p>
              </footer>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <Sidebar />
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 overflow-y-auto p-4 pb-20"> {/* Extra bottom padding for bottom nav */}
                {children}
              </main>
              <footer className="py-3 px-6 text-center text-sm text-gray-600 border-t bg-white mb-16"> {/* Margin bottom for bottom nav */}
                <p>© {new Date().getFullYear()} Zuriscale</p>
              </footer>
            </div>
          </div>
        </EnergyProvider>
      </div>
    </div>
  );
}