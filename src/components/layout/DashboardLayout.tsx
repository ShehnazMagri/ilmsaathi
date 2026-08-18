import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header onToggleMobileSidebar={() => setMobileOpen(prev => !prev)} />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  );
};
