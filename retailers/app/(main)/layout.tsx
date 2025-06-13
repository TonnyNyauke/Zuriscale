import { EnergyProvider } from '@/components/ui/EnergyProvider';
import Sidebar from '@/components/ui/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <EnergyProvider>
        {/* Desktop: Traditional sidebar layout */}
        <div className="hidden md:flex h-full">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
            <footer className="py-3 px-6 text-center text-sm text-gray-600 border-t bg-white flex-shrink-0">
              <p>© {new Date().getFullYear()} Zuriscale</p>
            </footer>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
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