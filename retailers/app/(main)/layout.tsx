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
      <div className= 'h-full bg-gray-50'>
        <EnergyProvider> {/* Wrap with EnergyProvider */}
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* <Header /> */}
              <main className="flex-1 overflow-y-auto p-4 md:p-6">
                {children}
              </main>
              <footer className="py-3 px-6 text-center text-sm text-gray-600 border-t">
                <p>© {new Date().getFullYear()} Zuriscale</p>
              </footer>
            </div>
          </div>
        </EnergyProvider>
      </div>
    </div>
  );
}