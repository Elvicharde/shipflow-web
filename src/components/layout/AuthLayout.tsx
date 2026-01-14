import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-x-hidden overflow-y-auto flex items-center justify-center no-scrollbar">
      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-12 min-h-screen">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 32 32"
                  stroke="currentColor"
                >
                  <circle cx="16" cy="16" r="14" strokeWidth="2" />
                  <path
                    d="M10 16l4 4 8-8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white text-2xl font-extrabold tracking-tight">
                ShipFlow
              </span>
            </Link>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-lg border border-indigo-500/20 rounded-2xl shadow-xl shadow-indigo-500/20 px-8 py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
