import React, { useRef, useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/authStore';
import UserAvatar from '@/components/ui/user-avatar';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface SideNavLinkProps {
  name: string;
  activeImg: string;
  img: string;
  path: string;
  activeTab: boolean;
  sidebarCollapse: boolean;
}

// Example sidebarLink and userData for demonstration. Replace with your actual data/logic.
const sidebarLink = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '/icons/dashboard-icon.svg',
    active: '/icons/active-dashboard.svg',
    path: '/dashboard',
  },
  {
    id: 'shipments',
    name: 'Shipments',
    icon: '/icons/cart.svg',
    active: '/icons/active-cart.svg',
    path: '/shipments',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '/icons/analytics-icon.svg',
    active: '/icons/active-analytics-icon.svg',
    path: '/analytics',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '/icons/settings.svg',
    active: '/icons/active-settings.svg',
    path: '/settings',
  },
];

// Dummy user data, replace with actual user data from store/context
const userData = {
  firstName: 'Alex',
  lastName: 'Miller',
  email: 'alex.miller@email.com',
};

// Dummy helpers for filtering links, replace with your logic
const shouldExcludeLink = (id: string) => id === 'settings';

const SideNavLink = ({
  name,
  activeImg,
  img,
  path,
  activeTab,
  sidebarCollapse,
}: SideNavLinkProps) => (
  <li>
    <Link
      to={path}
      className={`flex items-center gap-3 rounded px-3 py-2 w-full text-sm font-medium transition-colors
        ${activeTab ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-muted'}
        ${sidebarCollapse ? 'justify-center px-2' : 'justify-start'}`}
    >
      <img src={activeTab ? activeImg : img} alt={name} className="w-5 h-5" />
      {!sidebarCollapse && name}
    </Link>
  </li>
);

export const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapse, setSidebarCollapsed] = useState(false);
  const [activeId, setActiveId] = useState('dashboard'); // Replace with your active tab logic
  const sidebar = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      const targetNode = target as Node;
      if (
        sidebar.current.contains(targetNode) ||
        trigger.current.contains(targetNode)
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [setSidebarOpen, sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`no-scroll absolute left-0 top-0 z-9999 flex h-screen gap-y-3 rounded-r-2xl border-r pt-6 text-card-border lg:z-0 ${
        sidebarCollapse ? 'w-20.5' : 'w-68'
      } flex-col overflow-auto bg-[#F7F9FC] duration-300 ease-linear sm:overflow-y-hidden lg:static lg:translate-x-0 ${
        !sidebarCollapse ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex items-start justify-between gap-2">
        <div className={`${sidebarCollapse ? 'px-3' : 'px-6'} pb-6`}>
          {/* <Link to="/">
            <img
              src={`${sidebarCollapse ? '/logo-collapsed.svg' : '/logo.svg'}`}
              className={`h-7.5 w-56 transition-all duration-700 ease-in-out`}
              alt="ShipFlow Logo"
            />
          </Link> */}

          <Link
            to="/dashboard"
            className={`flex items-center gap-3 ${sidebarCollapse && 'hidden'}`}
          >
            <span className="text-2xl font-bold tracking-tight">ShipFlow</span>
          </Link>
        </div>
        <button
          ref={trigger}
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          aria-controls="sidebar"
          aria-expanded={sidebarCollapse}
          className={`absolute ${!sidebarCollapse ? 'right-2 top-1' : 'right-6 -top-1'} z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white cursor-pointer border border-slate-200 shadow-md hover:bg-slate-100 transition`}
        >
          <ChevronLeftIcon
            className={clsx(
              'size-5 text-slate-900 transition-transform duration-300',
              sidebarCollapse && 'rotate-180',
            )}
          />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scroll flex flex-1 flex-col justify-between gap-y-24 overflow-y-auto pb-20 duration-300 ease-linear sm:pb-11">
        <nav className="cursor-pointer px-2">
          <div>
            <ul
              className={`mb-6 flex flex-col ${
                sidebarCollapse ? 'items-center' : ''
              } gap-1`}
            >
              {sidebarLink
                .filter((link) => !shouldExcludeLink(link.id))
                .map((e, index) => (
                  <SideNavLink
                    sidebarCollapse={sidebarCollapse}
                    activeTab={activeId === e.id}
                    name={e.name}
                    activeImg={e.active}
                    img={e.icon}
                    path={e.path}
                    key={index}
                  />
                ))}
            </ul>
          </div>
        </nav>

        <div
          className={`flex flex-col ${
            sidebarCollapse && 'items-center'
          } gap-y-6`}
        >
          <nav className="cursor-pointer px-2">
            <div>
              <ul
                className={`mb-6 flex flex-col ${
                  sidebarCollapse ? 'items-center' : ''
                } gap-1`}
              >
                {sidebarLink
                  .filter((link) => shouldExcludeLink(link.id))
                  .map((e) => (
                    <SideNavLink
                      sidebarCollapse={sidebarCollapse}
                      activeTab={activeId === e.id}
                      name={e.name}
                      activeImg={e.active}
                      img={e.icon}
                      path={e.path}
                      key={e.path}
                    />
                  ))}
              </ul>
            </div>
          </nav>

          <div className="flex items-center justify-between gap-x-5 px-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (sidebarCollapse) {
                  setSidebarCollapsed(!sidebarCollapse);
                } else {
                  navigate('/dashboard/settings/');
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full">
                  <UserAvatar
                    username={`${userData?.lastName} ${userData?.firstName}`}
                    img_url={null}
                  />
                </span>
                {!sidebarCollapse && (
                  <span className="block max-w-32.5 text-left">
                    <span className="block truncate text-sm font-semibold text-[#101928]">
                      {`${userData?.lastName} ${userData?.firstName}`}
                    </span>
                    <span className="block truncate text-xs font-normal text-[#475367]">
                      {userData?.email}
                    </span>
                  </span>
                )}
              </div>
            </button>
            {!sidebarCollapse && (
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="cursor-pointer p-2"
              >
                <img
                  src="/icons/sign-out-dark.svg"
                  className="h-4 w-4 invert-[.27] hover:scale-125"
                  alt="sign out icon"
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
