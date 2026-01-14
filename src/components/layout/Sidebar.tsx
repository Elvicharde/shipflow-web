import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'Dashboard',
    icon: '/icons/dashboard-icon.svg',
    activeIcon: '/icons/active-dashboard.svg',
    route: '/dashboard',
  },
  {
    label: 'Shipments',
    icon: '/icons/cart.svg',
    activeIcon: '/icons/active-cart.svg',
    route: '/shipments',
  },
  {
    label: 'Analytics',
    icon: '/icons/analytics-icon.svg',
    activeIcon: '/icons/active-analytics-icon.svg',
    route: '/analytics',
  },
  {
    label: 'Settings',
    icon: '/icons/settings.svg',
    activeIcon: '/icons/active-settings.svg',
    route: '/settings',
  },
];

export const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);
  const handleCollapse = () => setSidebarCollapsed((collapsed) => !collapsed);

  return (
    <aside
      className={`h-screen bg-white border-r flex flex-col justify-between transition-all duration-200 fixed z-40 top-0 left-0
        ${sidebarOpen ? (sidebarCollapsed ? 'w-20' : 'w-64') : '-translate-x-full'}
        lg:static lg:translate-x-0`}
    >
      <div>
        <div
          className={`flex items-center gap-2 ${sidebarCollapsed ? 'px-3' : 'px-6'} py-6`}
        >
          <img
            src={
              sidebarCollapsed
                ? '/icons/dashboard-icon.svg'
                : '/icons/dashboard-icon.svg'
            }
            alt="Logo"
            className="w-10 h-10 bg-blue-100 rounded-full p-2"
          />
          {!sidebarCollapsed && (
            <span className="font-bold text-lg tracking-tight">
              ShipmentCentral
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleSidebar}
            aria-label="Toggle sidebar"
            className="ml-auto lg:hidden"
          >
            <img src="/icons/arrow-left.svg" alt="toggle" className="w-5 h-5" />
          </Button>
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.route);
            return (
              <Link
                key={item.label}
                to={item.route}
                className={`flex items-center gap-3 rounded px-3 py-2 w-full text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-muted'}
                  ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start'}`}
              >
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                />
                {!sidebarCollapsed && item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3 px-6 py-4 border-t">
        <Avatar>
          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        {!sidebarCollapsed && (
          <div>
            <div className="font-medium">Alex Miller</div>
            <div className="text-xs text-muted-foreground">Manager Account</div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCollapse}
          aria-label="Collapse sidebar"
        >
          <img
            src={
              sidebarCollapsed
                ? '/icons/arrow-right.svg'
                : '/icons/arrow-left.svg'
            }
            alt="collapse"
            className="w-5 h-5"
          />
        </Button>
      </div>
    </aside>
  );
};
