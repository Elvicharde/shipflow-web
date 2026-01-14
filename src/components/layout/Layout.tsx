import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard Overview',
  '/shipments': 'Shipments',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const currentRoute =
    Object.keys(routeTitles).find((r) => location.pathname.startsWith(r)) ||
    '/dashboard';
  return (
    <div className="flex h-screen bg-muted font-sans overflow-y-hidden no-scrollbar">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={routeTitles[currentRoute] || 'Dashboard'} />
        <main className="flex-1 p-8 bg-muted/50 overflow-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
